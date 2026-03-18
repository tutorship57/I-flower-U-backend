import { RecommendationStatus } from "../../enum/recommendation/recommendation.enum";
export interface recommendationData {
  status?: RecommendationStatus;
  user_personality: string;
  suitable_flowers: string[];
  flower_description: string[];
  error?: string;
}

