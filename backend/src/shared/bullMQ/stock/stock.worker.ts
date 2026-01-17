import { Worker } from "bullmq";
import prisma from "../../prisma/prismaClient";
import { OrderStatusEnum } from "../../types/enum/order/orderStatus";
import { stripe } from "../../stripe/stripe.service";
import { getCartNormalizedService } from "../../../modules/checkout/service/checkout.service";
import { getCartItemsByCartIdService } from "../../../modules/cart/service/cartItem.service";
import {
  createPaymentService,
  updatePaymentService,
  updatePaymentStatusService,
} from "../../../modules/payment/service/payment.service";
import { paymentQueue } from "../payment/payment.queue";
import { decreaseStockService } from "../../../modules/product/service/product.service";
export const stockReserveWorker = new Worker("reserve-stock", async (job) => {
  console.log("Processing job:", job.id, "with data:", job.data);
  // Add your job processing logic here
  const { cart_id, order_id, total_amount, payment_id } = job.data;
  const originalItems = await getCartItemsByCartIdService(cart_id);

  const cartItemsReserve = await getCartNormalizedService(cart_id);

  await decreaseStockService(cartItemsReserve);
  

  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/checkout/cancel`,
    metadata: {
      order_id: order_id, // เก็บไว้สำหรับ webhook
    },
    line_items: originalItems.map((item: any) => ({
      price_data: {
        currency: "thb",
        product_data: {
          name: item.product.product_name,
        },
        unit_amount: item.product.product_price * 100, // amount in cents   
      },
      quantity: item.quantity,
    })),
  });

  const payment = await createPaymentService({
    order_id: order_id,
    paytype_id: 1,
    session_id: session.id as string,
    amount: total_amount,
    payment_url: session.url as string,
  });

  await prisma.order.update({
    where: {
      order_id,
    },
    data: {
      order_status: OrderStatusEnum.RESERVE,
    },
  });
  await paymentQueue.add(
    "payment-check",
    {
      payment_id: payment.payment_id,
      order_id: order_id,
      session_id: session.id,
    },
    {
        delay: 15 * 60 * 1000, // 15 minutes
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
        removeOnComplete: 20,
        removeOnFail: 20,
    }
  );


  return Promise.resolve();
});

export const stockReleaseWorker = new Worker(
  "release-stock",
  async (job) => {}
);
