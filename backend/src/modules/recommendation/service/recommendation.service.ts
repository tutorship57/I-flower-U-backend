import { gooleAI } from "../../../shared/googleAl/googleAl.service";

import { getAllFlowerTypesService } from "../../product/service/flowerType.service";
import { sha256 } from "../../../shared/utils/hash.util";
import { generatePrompt } from "../../../shared/googleAl/prompts/flowerRecommendation.prompt";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { recommendationQueue } from "../../../shared/bullMQ/recommendation/recommendation.queue";
async function getFlowerRecommendationService(
  userInput: string,
  clientId: string,
) {
  const flowerInDatabase = await getAllFlowerTypesService();

  const flowerName = flowerInDatabase.map((flower) => flower.type_name);
  const flowerIdsObj = Object.fromEntries(
    flowerInDatabase.map((flower) => [flower.type_name, flower.flower_type_id]),
  );
  const prompt = generatePrompt(flowerName, userInput);
  console.log("Generated Prompt:", prompt);

  const jobId = sha256(clientId + JSON.stringify(userInput));
  const existingJob = await recommendationQueue.getJob(jobId);

  if (existingJob) {
    console.log("Job already exists:", existingJob.id);
    const state = await existingJob.getState();
    console.log("Existing job state:", state);

    if (state !== "failed") {
      return existingJob.id;
    }
    await existingJob.remove();
  }
  console.log("create New Job");
  const job = await recommendationQueue.add(
    "recommendation",
    {
      prompt,
      flowerName,
      flowerIdsObj,
    },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: {
        age: 300,
        count: 100,
      },
      removeOnFail: {
        age: 24 * 3600,
        count: 300,
      },
      jobId: `${jobId}`,
    },
  );

  return job.id; // Return the job ID to the client for tracking
}

const getFlowerRecommendationResultService = async (jobId: string) => {
  try {
    const getJobResult = await recommendationQueue.getJob(jobId);
    console.log("this is job: ", getJobResult);

    if (!getJobResult) {
      throw new AppError("Job not found", 404);
    }
    const jobState = await getJobResult?.getState();
    if (jobState === "completed") {
      const result = await getJobResult.returnvalue;
      return result;
    } else if (jobState === "failed") {
      throw new AppError("Recommendation generation failed", 500);
    } else {
      throw new AppError("Recommendation is still processing", 202);
    }
  } catch (error) {
    console.error("Error fetching job result:", error);
    throw new AppError("Failed to fetch recommendation result", 500);
  }
};

export { getFlowerRecommendationService, getFlowerRecommendationResultService };
