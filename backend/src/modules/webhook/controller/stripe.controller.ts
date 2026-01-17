import type { Request, Response } from 'express';
import { getPaymentBySessionIdService,updatePaymentStatusService } from '../../payment/service/payment.service';
import { stripe } from '../../../shared/stripe/stripe.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { stripeWebhookService } from '../service/stripe.service';
const stripeWebhookController = asyncHandler(async (req:Request, res:Response) => {
    const sig = req.headers["stripe-signature"];
    const reqBody = req.body;
    console.log("Received Stripe webhook:", reqBody);
    const event = await stripeWebhookService(sig as string, reqBody);
    res.status(200).json({data: event});
})



export { stripeWebhookController };