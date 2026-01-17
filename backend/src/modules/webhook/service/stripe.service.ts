import { stripe } from '../../../shared/stripe/stripe.service';
import { AppError } from '../../../shared/utils/appErrorCustomize.util';
import { getPaymentBySessionIdService,updatePaymentStatusService } from '../../payment/service/payment.service';
import { PaymentStatusEnum } from '../../../shared/types/enum/payment/paymentStatus';
import { updateOrderStatusService } from '../../order/service/order.service';
import { OrderStatusEnum } from '../../../shared/types/enum/order/orderStatus';
const stripeWebhookService = async (signature: string, Reqbody: string) => {
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
      console.log(`Received Stripe event: ${event.type} this is not handled`);
      throw new AppError('Event not handled', 400);
    }
    const session = event.data.object;
    console.log("Checkout session completed:", session);
    const payment = await getPaymentBySessionIdService(session.id);
    if (!payment) {
      console.log(`Payment not found for session ID: ${session.id}`);
      throw new AppError(`Payment not found for session ID: ${session.id}`, 404);
    }

    const updatedPayment = await updatePaymentStatusService(payment.payment_id, PaymentStatusEnum.COMPLETED);
    const updatedOrder =  await updateOrderStatusService(payment.order_id, OrderStatusEnum.PAID);
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