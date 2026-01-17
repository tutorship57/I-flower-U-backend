import { get } from "node:http";
import prisma from "../../../shared/prisma/prismaClient";
import { OrderStatusEnum } from "../../../shared/types/enum/order/orderStatus";
const orderRepository = {
    createOrder: async (data: { user_id: string; total_amount: number; order_status?: OrderStatusEnum}) => {
        return await prisma.order.create({
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
    updateOrderStatus: async (order_id: string, order_status: OrderStatusEnum) => {
        return await prisma.order.update({
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