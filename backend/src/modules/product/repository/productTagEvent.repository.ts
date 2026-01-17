import { get } from 'node:http';
import prisma from '../../../shared/prisma/prismaClient';

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
    createProductTagEvent: async (tag_id: number, product_id: string) => {
        return await prisma.productTagEvent.create({
            data: {
                TagEvent:{connect: {tag_id}},
                product: {connect: {product_id:product_id}}
            },
        });
    },
    updateProductTagEvent: async (tag_id: number, product_id: string, newTagId: number) => {
        return await prisma.productTagEvent.update({
            where: {    
                tag_id_product_id: {
                    tag_id,
                    product_id,
                },
            },
            data: {
                tag_id: newTagId,
            },
        });
    },
    deleteProductTagEvent: async (tag_id: number, product_id: string) => {
        return await prisma.productTagEvent.delete({
            where: {
                tag_id_product_id: {
                    tag_id,
                    product_id,
                },
            },
        });
    },

}

export default productTagEventRepository;