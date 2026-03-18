import { number } from "zod";
import prisma from "../../../shared/prisma/prismaClient";

import { createShopDataType, shopRepositoryType, updateShopDataType } from "../type/shop.type";
 



const shopRepository: shopRepositoryType = {
    getAllShop: async()=>{
        return await prisma.shop.findMany();
    },
    getShopById: async (shop_id: string) => {
        return await prisma.shop.findUnique({
            where: { shop_id },
            include:{
                user:{
                    select:{
                        user_id:true,
                        user_name:true,
                        user_email:true
                    }
                }
            }
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
