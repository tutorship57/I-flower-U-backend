import { getFlowerRecommendationService } from "../service/recommendation.service";
import {asyncHandler} from '../../../shared/middleware/asyncHandler.Middleware';
import { Request, Response} from "express";


const getFlowerRecommendationController = asyncHandler(async (req: Request, res: Response) => {
    const { userInput } = req.body;
    const recommendation = await getFlowerRecommendationService(userInput);
    return res.status(200).json({ data: recommendation });
});


export {
    getFlowerRecommendationController
}