import { create } from "node:domain";
import prisma from "../../../shared/prisma/prismaClient";

const orderItemRepository = {
    getOrderItemById: async (item_id: string) => {
        return await prisma.orderItem.findUnique({
            where: {item_id},
        });
    },
    getOrderItemsByOrderId: async (order_id: string) => {
        return await prisma.orderItem.findMany({
            where: {order_id},
        });
    },
    createOrderItem: async (data: {order_id: string; product_id: string; quantity: number; unit_price: number;}) => {
        return await prisma.orderItem.create({
            data,
        });
    },
    createOrderItems: async (data: {order_id: string; product_id: string; quantity: number; unit_price: number;}[]) => {
        return await prisma.orderItem.createMany({
            data,
        });
    },
    updateOrderItem: async (item_id: string, data: {quantity?: number; unit_price?: number;}) => {
        return await prisma.orderItem.update({
            where: {item_id},
            data,
        });
    },
    deleteOrderItem: async (item_id: string) => {
        return await prisma.orderItem.delete({
            where: {item_id},
        });
    },
};

export default orderItemRepository;