import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware"
import { createPaymentTypeService } from "../service/paymentType.service";
import { Request, Response } from "express";
const createPaymentController = asyncHandler(async(req:Request, res:Response) => {
    const data = req.body;
    const newPayment = await createPaymentTypeService(data);
    res.status(201).json({
        data: newPayment
    });
})

export {
    createPaymentController
}