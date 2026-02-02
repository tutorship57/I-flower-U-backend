import type { Request, Response } from 'express';
import { getPaymentBySessionIdService,updatePaymentStatusService } from '../../payment/service/payment.service';
import { stripe } from '../../../shared/stripe/stripe.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { stripeWebhookService } from '../service/stripe.service';
const stripeWebhookController = asyncHandler(async (req:Request, res:Response) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return res.status(400).send("Missing stripe-signature");
    }
    console.log("Received Stripe webhook:", req.body as Buffer);
    const event = await stripeWebhookService(sig as string,req.body as Buffer);
    res.status(200).json({data: event});
})



export { stripeWebhookController };