import { gooleAI } from "../../../shared/googleAl/googleAl.service";
import { zodToJsonSchema } from "zod-to-json-schema";
import { flowerRecommendationSchema} from "../../../shared/zod/schema/flowerRecommend.schema";
import { getAllFlowerTypesService } from "../../product/service/flowerType.service"
import { generatePrompt } from "../../../shared/googleAl/prompts/flowerRecommendation.prompt";
import { validateFlowersFromDB } from "../../../shared/utils/flowerValidation.util";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
async function getFlowerRecommendationService(userInput: string) {
  const flowerInDatabase = await getAllFlowerTypesService();
  const flowerName = flowerInDatabase.map((flower) => flower.type_name);
  const prompt = generatePrompt(flowerName, userInput);
  console.log("Generated Prompt :", prompt);
  const response = await gooleAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(flowerRecommendationSchema as any),
    }
  });

  const responseText = response.text;
  console.log("AI Response :", responseText);
  console.log("json Parsed :", JSON.parse(response.text));
    const responseJson = flowerRecommendationSchema.parse(
      JSON.parse(response.text)
    );

  const validFlowers = validateFlowersFromDB(
    responseJson.suitable_flowers,
    flowerName
  );

  if(validFlowers.length <3){
    throw new AppError("The recommended flowers are not sufficient or invalid.", 500);
  }

  responseJson.suitable_flowers = validFlowers;


  return responseJson;
}

export { getFlowerRecommendationService };
