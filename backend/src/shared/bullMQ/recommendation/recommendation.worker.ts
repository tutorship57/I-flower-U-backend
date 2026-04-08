import { tryCatch, Worker } from "bullmq";
import "dotenv/config";
import { Prisma } from "@prisma/client";
import { redis } from "../../redis/redis.service";
import { gooleAI } from "../../../shared/googleAl/googleAl.service";
import { zodToJsonSchema } from "zod-to-json-schema";
import { flowerRecommendationSchema } from "../../../shared/zod/schema/flowerRecommend.schema";
import { validateFlowersFromDB } from "../../../shared/utils/flowerValidation.util";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { recommendationData } from "../../types/interface/recommendation/recommendation.interface";
import { RecommendationStatus } from "../../types/enum/recommendation/recommendation.enum";
import { redisConnection } from "../../redis/redis.connection";
export const recommendationWorker = new Worker(
  "recommendation",
  async (job) => {
    const { prompt, flowerName,flowerIdsObj } = job.data;
    console.log("Processing job:", job.id, "with data:", job.data);
    const recommendationKey = `recommendation:${job.data.user_id}`;
    let existingRecommendation = await redis.get(recommendationKey);
    if (existingRecommendation) {
      return;
    }

    try {
      const response = await gooleAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(
            flowerRecommendationSchema as any,
          ),
        },
      });

      const responseText = response.text;
      const responseJson = JSON.parse(response.text);
      console.log("this is ai response",responseJson)
      
      // const validFlowers = validateFlowersFromDB(
      //   responseJson.suitable_flowers,
      //   flowerName,
      // );

      // responseJson.suitable_flowers = validFlowers;
      // responseJson.suitable_flowers = validFlowers.map((flower) => {
      //   const flower_id = flowerIdsObj[flower];
      //   return flower_id;
      // });
      let redisData: recommendationData = responseJson;
      redisData.error = null;
      redisData.status = RecommendationStatus.SUCCESS;
      return redisData
    } catch (error) {
        console.error("Error processing recommendation job:", error);
        throw new AppError("Failed to generate flower recommendation", 500);
    }
  },
  {
    connection: redisConnection,
  },
);


recommendationWorker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`);
});

recommendationWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err);
  console.log("Job data on failure:", job.data);

  const max = job.opts.attempts ?? 1;

  if (job.attemptsMade < max) {
    console.log(`Job ${job.id} will be retried. Attempt ${job.attemptsMade} of ${max}`);
    return
  }
  
});

recommendationWorker.on("error", (err) => {
  console.error("Worker error:", err);
});