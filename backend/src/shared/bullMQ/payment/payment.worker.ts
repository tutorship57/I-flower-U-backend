import { Worker } from "bullmq";
import "dotenv/config";
import { redisConnection } from "../../redis/redis.connection";
import {
  createPaymentService,
  updatePaymentStatusService,
} from "../../../modules/payment/service/payment.service";
import { stripe } from "../../stripe/stripe.service";
import prisma from "../../prisma/prismaClient";
import { PaymentStatusEnum } from "../../types/enum/payment/paymentStatus";
import {OrderStatusEnum} from "../../types/enum/order/orderStatus"
import { getOrderItemsByOrderIdService } from "../../../modules/order/service/orderItem.service";
import { getOrderByIdService, updateOrderStatusService } from "../../../modules/order/service/order.service";
import { getAllProductsStockServiceByProductId } from "../../../modules/stock/service/product-stock.service";
import { updateReservationsQueryRawService } from "../../../modules/stock/service/product-stock.service";
import { Prisma } from "@prisma/client";
import { TransactionStockEnum } from "../../types/enum/stock/transaction-stock.enum";
import { updateReservationStocksService } from "../../../modules/stock/service/reservation-stock.service";
import { ReservationStatusEnum } from "../../types/interface/stock/reservation-stock.interface";
export const stripePaymentWorker = new Worker(
  "stripe-payment",
  async (job) => {
    console.log("Processing job:", job.id, "with data:", job.data);

    // Add your job processing logic here
    const { order_id, total_amount } = job.data;
    const orderItems = await getOrderItemsByOrderIdService(order_id);
    console.log("this is order", orderItems)
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
        const session = await stripe.checkout.sessions.create({
        ui_mode: "hosted",
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${FRONTEND_URL}/checkout/cancel`,
        metadata: {
        order_id: order_id, // เก็บไว้สำหรับ webhook
        },
        line_items: orderItems.map((item: any) => ({
          price_data: {
            currency: "thb",
            product_data: {
              name: item.product.product_name,
              images: item.product.productImage?.length
                ?   [item.product.productImage[0].image_url]
                :  [],
            },
            unit_amount: Math.round(Number(item.product.product_price) * 100),
          },
          quantity: item.quantity,
          
        })),
      });
      console.log("this is session", session)
      const payment = await createPaymentService({
        order_id: order_id,
        session_id: session.id as string,
        paytype_id: 1,
        payment_url: session.url as string,
        amount: total_amount,
      });
    
  },
  {
    connection: redisConnection,
  },
);


stripePaymentWorker.on("failed",async (job, err) => {
  console.log(err);
  const max = job.opts.attempts ?? 1;
  const order_id = job.data.order_id

  if(job.attemptsMade < max){/// last attemp 
    return
  }

  const order = await getOrderByIdService(order_id)
  if(order.order_status === OrderStatusEnum.CANCEL){ // already cancel
    return 
  }

  const orderItems = await getOrderItemsByOrderIdService(order_id);
  const itemMap_ids = new Map(orderItems.map(i => [i.product.product_id, i]));
  const product_ids = orderItems.map((item) => item.product.product_id);
  const updateReservation = [];

  await prisma.$transaction(async (tx)=>{
    await updateOrderStatusService(tx,order_id,OrderStatusEnum.CANCEL);

    const stockList = await getAllProductsStockServiceByProductId(tx,product_ids);
    const orderStockRelease = [];
    for (const stock of stockList) {
            const item = itemMap_ids.get(stock.product_id);
            updateReservation.push(Prisma.sql`(${stock.stock_id}, ${-item.quantity})`);
            orderStockRelease.push({
                stock_id: stock.stock_id,
                change_qty: -item.quantity,
                Transaction_type: TransactionStockEnum.REMOVE
            });
    }

    const updateReservationStockStatus = await updateReservationStocksService(tx,order_id,ReservationStatusEnum.CANCELLED);
    if(updateReservationStockStatus.count!== orderItems.length){
      throw new Error("Failed to update stock");// update length not equal the orderItems.length
    }

    const updatedCount =await updateReservationsQueryRawService(tx,updateReservation);
    if(updatedCount !== orderItems.length){
      throw new Error("Failed to update stock"); // update length not equal the orderItems.length
    }

  })

})

stripePaymentWorker.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed`);
});

stripePaymentWorker.on("error", (err) => {
  console.error("Worker crashed:", err);
});