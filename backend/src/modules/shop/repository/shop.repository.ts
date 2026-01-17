import { number } from "zod";
import prisma from "../../../shared/prisma/prismaClient";

import { createShopDataType, shopRepositoryType, updateShopDataType } from "../type/shop.type";
 



const shopRepository: shopRepositoryType = {
    getShopById: async (shop_id: string) => {
        return await prisma.shop.findUnique({
            where: { shop_id },
        });
    },
    createShop: async (data: createShopDataType) => {
        return await prisma.shop.create({
            data,
        });
    },
    updateShop: async (shop_id: string, data: updateShopDataType) => {
        return await prisma.shop.update({
            where: { shop_id },
            data,
        });
    },
    deleteShop: async (shop_id: string) => {
        return await prisma.shop.delete({
            where: { shop_id },
        });
    },
};



export default shopRepository;
