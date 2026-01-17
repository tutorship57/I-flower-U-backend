import { get } from 'node:http';
import prisma from '../../../shared/prisma/prismaClient';
import { deleteProduct } from '../controller/product.controller';

const productTagEventRepository = {
    getAllProductTagEvents: async () => {
        return await prisma.productTagEvent.findMany({
            include:{
                TagEvent:true,
                product:true,
            }
        });
    },
    getProductTagEventsByProductId: async (product_id: string) => {
        return await prisma.productTagEvent.findMany({
            where: { product_id },
            include:{
                TagEvent:true,
            }
        });
    },
    createProductTagEvent: async (data:{ tag_id: number, product_id: string }[]) => {
        return await prisma.productTagEvent.createMany({
            data
        });
    },
    deleteProductTagEvent: async (product_id: string) => {
        return await prisma.productTagEvent.deleteMany({
            where: {
                product_id: product_id,
            },
        });
    },
}

export default productTagEventRepository;