import { create } from "node:domain";
import prisma from "../../../shared/prisma/prismaClient";
import { Prisma } from "@prisma/client";

const orderItemRepository = {
    getOrderItemById: async (item_id: string) => {
        return await prisma.orderItem.findUnique({
            where: {item_id},
        });
    },
    getOrderItems: async (queryFilter:{order_id?: string, product_id?: string}) => {
        return await prisma.orderItem.findMany({
            where: queryFilter,
        });
    },
    getOrderItemsByOrderId: async (order_id: string) => {
        return await prisma.orderItem.findMany({
            where: {order_id},
            select:{
                item_id:true,
                quantity:true,
                unit_price:true,
                product:{
                    select:{
                        product_id:true,
                        product_name:true,
                        product_price:true,
                        product_description:true,
                        productImage: {
                            select: {
                                image_url: true,
                            },
                        },
                    }
                }
            }
        });
    },
    createOrderItem: async (data: {order_id: string; product_id: string; quantity: number; unit_price: number;}) => {
        return await prisma.orderItem.create({
            data,
        });
    },
    createOrderItems: async (tx: Prisma.TransactionClient, data: {order_id: string; product_id: string; quantity: number; unit_price: number;}[]) => {
        return await tx.orderItem.createMany({
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