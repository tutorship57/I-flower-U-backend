import { Worker } from "bullmq";
import { redisConnection } from "../../redis/redis.connection";
import { updatePaymentStatusService,getPaymentByOrderIdService,getPaymentBySessionIdService } from "../../../modules/payment/service/payment.service";
import { updateOrderStatusService } from "../../../modules/order/service/order.service";
import { AppError } from "../../utils/appErrorCustomize.util";
import { PaymentStatusEnum } from "../../types/enum/payment/paymentStatus";
import { OrderStatusEnum } from "../../types/enum/order/orderStatus";
import { getOrderNormalizedService } from "../../../modules/checkout/service/checkout.service";
import { increaseStockService } from "../../../modules/product/service/product.service";

import prisma from "../../prisma/prismaClient";
export const paymentWorker = new Worker (
    "payment-check",
    async (job) => {
        console.log("Processing job:", job.id, "with data:", job.data);
        // Add your job processing logic here
        const { order_id, session_id} = job.data;
        const payment = await getPaymentByOrderIdService(order_id);
        if(payment && payment.payment_status == PaymentStatusEnum.COMPLETED){
            return  
        }
        if(payment && payment.session_id !== session_id){
            throw new AppError("Session ID mismatch for order_id: " + order_id, 400);
        }
        if (!payment) {
            throw new AppError("Payment not found for order_id: " + order_id, 404);
        }
        const orderItems = await getOrderNormalizedService(order_id);
        
        const orderItemReserveFail = await getOrderNormalizedService(order_id)
        await increaseStockService(orderItemReserveFail); 


        await updatePaymentStatusService(payment.payment_id, PaymentStatusEnum.FAILED);
        await updateOrderStatusService(order_id, OrderStatusEnum.CANCEL);
    },
    {
        connection: redisConnection,
    }
)


// await prisma.$transaction(async (tx) => {
        //     await Promise.all(
        //         orderItems.map((item) =>
        //         tx.product.update({
        //         where: {
        //             product_id: item.product_id,
        //             product_stock: { gte: item.quantity },
        //         },
        //         data: {
        //             product_stock: {
        //             decrement: item.quantity,
        //             },
        //         },
        //         })
        //     )
        //     );
        // });
