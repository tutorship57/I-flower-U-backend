import { z } from "zod";


const flowerRecommendationSchema = z.object({
  user_personality: z.string(),
  suitable_flowers: z.array(z.string()).length(3), // เอาแค่ 3 ดอก
  flower_description: z.array(z.string()).length(3),
});

export { flowerRecommendationSchema };

