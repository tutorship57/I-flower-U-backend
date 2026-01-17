import prisma from '../../../shared/prisma/prismaClient';


const imageRepository = {
    getAllImages: async () => {
        return await prisma.productImage.findMany();
    },
    findImageById: async (image_id: string) => {
        return await prisma.productImage.findUnique({
            where: {image_id},
        });
    },
    findImagesByProductId: async (product_id: string) => {
        return await prisma.productImage.findMany({
            where: {product_id: product_id},
        });
    },
    createMultipleImages: async (data: {product_id: string; image_url: string,file_key: string}[]) => {
        return await prisma.productImage.createMany({
            data,
        });
    },
    createMocksImages: async (data: {product_id: string; image_url: string,file_key: string}[]) => {
        return await prisma.productImage.createMany({
            data,
        });
    },
    updateImage: async (image_id: string, data: {product_id?: string; image_url?: string;}) => {
        return await prisma.productImage.update({
            where: {image_id},
            data,
        });
    },
    deleteImage: async (image_id: string) => {
        return await prisma.productImage.delete({
            where: {image_id},
        });
    },
}    
export default imageRepository