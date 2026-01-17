import prisma from "../../../shared/prisma/prismaClient";
import { PaymentStatusEnum } from "../../../shared/types/enum/payment/paymentStatus";
import { PaymentStatus } from "@prisma/client";


const mapPaymentStatusToPrisma = (
  status: PaymentStatusEnum
): PaymentStatus => {
  return status as PaymentStatus;
};

const paymentRepository = {
    createPayment: async (data: { order_id: string; session_id: string; paytype_id: number; amount:number}) => {
        return await prisma.payment.create({
            data: {
                order_id: data.order_id,
                session_id: data.session_id,    
                paytype_id: data.paytype_id,
                amount: data.amount,
            },
        });
    },
    getPaymentById: async (payment_id: string) => {
        return await prisma.payment.findUnique({
            where: { payment_id },
        });
    },
    getPaymentByOrderId: async (order_id: string) => {
        return await prisma.payment.findFirst({
            where: { order_id , payment_status: "PENDING"},
        });
    },
    getPaymentBySessionId: async (session_id: string) => {
        return await prisma.payment.findUnique({
            where: { session_id },
        });
    },  
    updatePaymentStatus: async (payment_id: string, payment_status:PaymentStatusEnum ) => {
        return await prisma.payment.update({
            where: { payment_id },
            data: { payment_status: mapPaymentStatusToPrisma(payment_status) },
        });
    },
    updatePayment: async (payment_id: string, data: { order_id?: string; session_id?: string; paytype_id?: number; amount?:number,payment_url?:string}) => {
        return await prisma.payment.update({
            where:{payment_id},
            data:data,
        })
    },
    deletePayment: async (payment_id: string) => {
        return await prisma.payment.delete({
            where: { payment_id },
        });
    },
};

export default paymentRepository;