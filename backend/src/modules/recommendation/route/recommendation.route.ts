import { Router } from "express";
import { getFlowerRecommendationController,getFlowerRecommendationResultController } from "../controller/recommendation.controller";
const router = Router();

router.post('/flower', getFlowerRecommendationController);
router.get('/flower/job/:jobId', getFlowerRecommendationResultController);

export default router ;