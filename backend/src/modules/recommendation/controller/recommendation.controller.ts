import { getFlowerRecommendationResultService, getFlowerRecommendationService } from "../service/recommendation.service";
import {asyncHandler} from '../../../shared/middleware/asyncHandler.Middleware';
import { Request, Response} from "express";


const getFlowerRecommendationController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['Recommendation']
    const { userInput } = req.body;
    const clientId = req.headers['x-client-id'] as string;
    const recommendation = await getFlowerRecommendationService(userInput, clientId);
    return res.status(200).json({ data: recommendation });
});

const getFlowerRecommendationResultController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['Recommendation']
    const { jobId } = req.params;
    const getJobResult = await getFlowerRecommendationResultService(jobId);
    return res.status(200).json({ data: getJobResult });

})

export { getFlowerRecommendationController, getFlowerRecommendationResultController };