import { Router } from "express";
import { getFlowerRecommendationController } from "../controller/recommendation.controller";
const router = Router();

router.post('/flower', getFlowerRecommendationController);

export default router ;