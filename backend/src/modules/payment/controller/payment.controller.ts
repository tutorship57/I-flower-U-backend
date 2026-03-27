
import type {Request,Response} from 'express';
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import {  getPaymentByOrderIdService,getPaymentsService} from "../service/payment.service";

const getPaymentByOrderIdController = asyncHandler(async (req:Request, res:Response) => {
    // #swagger.tags = ['Payment']
    const order_id = req.params.order_id;
    const payment = await getPaymentByOrderIdService(order_id);
    res.status(200).json({
        data: payment
    });
});

const getPaymentsController = asyncHandler(async (req:Request, res:Response) => {
    // #swagger.tags = ['Payment']
    const reqQuery = req.query;
    const payment = await getPaymentsService(reqQuery);
    res.status(200).json({
        data: payment
    });
})


export {getPaymentByOrderIdController,getPaymentsController};