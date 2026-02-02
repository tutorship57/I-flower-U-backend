import { get } from "node:http";
import prisma from "../../../shared/prisma/prismaClient";
import { OrderStatusEnum } from "../../../shared/types/enum/order/orderStatus";
import { Prisma } from "@prisma/client";
const orderRepository = {
    createOrder: async (tx: Prisma.TransactionClient, data: { user_id: string; total_amount: number; order_status?: OrderStatusEnum}) => {
        return await tx.order.create({
            data,
        });
    },
    getAllOrders: async () => {
        return await prisma.order.findMany();
    },
    
    getOrderById: async (order_id: string) => {
        return await prisma.order.findUnique({
            where: { order_id },
        });
    },
    updateOrderStatus: async (tx: Prisma.TransactionClient, order_id: string, order_status: OrderStatusEnum) => {
        return await tx.order.update({
            where: { order_id },
            data: { order_status },
        });
    },
    deleteOrder: async (order_id: string) => {
        return await prisma.order.delete({
            where: { order_id },
        });
    },
};

export default orderRepository;