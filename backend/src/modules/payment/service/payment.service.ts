import paymentRepository from "../repository/payment.repository";
import { PaymentStatusEnum } from "../../../shared/types/enum/payment/paymentStatus";
const createPaymentService = async (data: { order_id: string; session_id: string; paytype_id: number, amount: number, payment_url: string}) => {
    const newPayment = await paymentRepository.createPayment(data);
    return newPayment;
}

const getPaymentByIdService = async (payment_id: string) => {
    const payment = await paymentRepository.getPaymentById(payment_id);
    if(!payment){
        throw new Error("Payment not found");
    }
    return payment;
}

const getPaymentByOrderIdService = async (order_id: string) => {
    const payment = await paymentRepository.getPaymentByOrderId(order_id);
    return payment;
}

const getPaymentBySessionIdService = async (session_id: string) => {
    const payment = await paymentRepository.getPaymentBySessionId(session_id);
    if(!payment){
        throw new Error("No payments found for this session");
    }
    return payment;
}
const updatePaymentService = async (payment_id: string, data: { order_id?: string; session_id?: string; paytype_id?: number, amount?: number,payment_url?: string}) => {
    const updatedPayment = await paymentRepository.updatePayment(payment_id, data);
    if(!updatedPayment){
        throw new Error("Payment not found");
    }
    return updatedPayment;
}

const updatePaymentStatusService = async (payment_id: string, payment_status:   PaymentStatusEnum) => {
    const updatedPayment = await paymentRepository.updatePaymentStatus(payment_id, payment_status);
    if(!updatedPayment){
        throw new Error("Payment not found");
    }
    return updatedPayment;
}

const deletePaymentService = async (payment_id: string) => {
    const payment = await paymentRepository.getPaymentById(payment_id);
    if(!payment){
        throw new Error("Payment not found");
    }
    const deletedPayment = await paymentRepository.deletePayment(payment_id);
    return deletedPayment;
}

export { createPaymentService, getPaymentByIdService,updatePaymentService, updatePaymentStatusService, deletePaymentService, getPaymentByOrderIdService, getPaymentBySessionIdService };