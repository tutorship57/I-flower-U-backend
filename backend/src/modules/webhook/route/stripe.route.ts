import { Router } from "express";
import express from "express";
import { stripeWebhookController } from "../controller/stripe.controller";
const router = Router();

// Stripe webhook controller


router.post('/webhook',express.raw({ type: "application/json" }),stripeWebhookController)

// router.get('/', (req, res) => {
//     console.log("Stripe Webhook API is running...");
//     res.status(200).send('Stripe Webhook API is running...');
// });

export { router as stripeRouter };