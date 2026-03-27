import { Router } from "express";
import express from "express";
import { stripeWebhookController } from "../controller/stripe.controller";
const router = Router();

// Stripe webhook controller

/**
 * @openapi
 * /api/stripe/webhook:
 *   post:
 *     summary: เข้าสู่ระบบ Stripe Webhook
 *     responses:
 *       200:
 *         description: สำเร็จ
 */
router.post('/webhook',express.raw({ type: "application/json" }),stripeWebhookController)



export { router as stripeRouter };