import { stripe } from '../../../shared/stripe/stripe.service';
import {Prisma} from '@prisma/client'
import { AppError } from '../../../shared/utils/appErrorCustomize.util';
import { getPaymentBySessionIdService,updatePaymentStatusService } from '../../payment/service/payment.service';
import { PaymentStatusEnum } from '../../../shared/types/enum/payment/paymentStatus';
import { updateOrderStatusService } from '../../order/service/order.service';
import { OrderStatusEnum } from '../../../shared/types/enum/order/orderStatus';
import prisma from '../../../shared/prisma/prismaClient';
import { getReservationStockByOrderIdService, updateReservationStocksService } from '../../stock/service/reservation-stock.service';
import {updateProductStockQueryRawService, updateReservationsQueryRawService } from '../../stock/service/product-stock.service';
import { createManyStockTransactionService } from '../../stock/service/transaction-stock.service';
import { TransactionStockEnum } from '../../../shared/types/enum/stock/transaction-stock.enum';
import { TransactionStockReasonEnum } from '../../../shared/types/enum/stock/transaction-stock.enum';
import { ReservationStatusEnum } from '../../../shared/types/interface/stock/reservation-stock.interface';
const stripeWebhookService = async (signature: string, Reqbody: Buffer) => {
  // Implement Stripe webhook handling logic here
  let event ;
  try {
    event = stripe.webhooks.constructEvent(
      Reqbody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.log("Error Webhook signature verification failed.", err.message);
    throw new Error(`Webhook Error: ${err.message}`);
  }
    const eventType = event.type;
    if ( eventType !== "checkout.session.completed") {
      return { message: `Received Stripe event: ${event.type} this is not handled`,
      status: 201,
      success: true,
      eventDetail: event
    };
    }
    const session = event.data.object;
    const payment = await getPaymentBySessionIdService(session.id);

    if (!payment) {
      throw new AppError(`Payment not found for session ID: ${session.id}`, 404);
    }


    const order_id = payment.order_id 
    const reserveStocksTransaction = await getReservationStockByOrderIdService(payment.order_id);

    const stockTransactionData = [];
      const updateProductStockReservation: Prisma.Sql[] = [];
      for (const reservation of reserveStocksTransaction) {
        stockTransactionData.push({
            stock_id: reservation?.stock_id as string,
            change_qty: -(reservation?.reserved_qty as number),
            reason: TransactionStockReasonEnum.ORDER,
            transaction_type: TransactionStockEnum.REMOVE,
        })
        updateProductStockReservation.push(Prisma.sql`(${reservation.stock_id}, ${-reservation.reserved_qty})`);
    }

    const updatedPayment = await prisma.$transaction(async (tx) => {
      const updatedPayment = await updatePaymentStatusService(tx, payment.payment_id, PaymentStatusEnum.COMPLETED);
      const updatedOrder =  await updateOrderStatusService(tx, payment.order_id, OrderStatusEnum.PAID);
      await updateReservationStocksService(tx,order_id,ReservationStatusEnum.COMPLETED);
      await createManyStockTransactionService(tx,stockTransactionData); // record transaction 
      await updateReservationsQueryRawService(tx,updateProductStockReservation); // decrease productReservation amount
      await updateProductStockQueryRawService(tx,updateProductStockReservation); // decrease productStock amount
      return updatedPayment;
    });
    console.log("update successfully")
    
    return { message: "your payment is completed",
      status: 200,
      success: true,
      eventDetail: event,
      paymentDetail: {
        payment_id: updatedPayment.payment_id,
        payment_status: updatedPayment.payment_status,
        amount: updatedPayment.amount
      }
    };
}
export { stripeWebhookService };