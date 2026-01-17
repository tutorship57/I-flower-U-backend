import prisma from '../../../shared/prisma/prismaClient';



const productCategoryRepository = {
    get:async (category_id: number) => {
        return await prisma.category.findUnique({
            where: {category_id},
        });
    },
    
    getAll: async () => {
        return await prisma.category.findMany();
    },

    findName: async (name: string) => {
        return await prisma.category.findUnique({
            where: {category_name: name},
        });
    },

    create: async (data: {category_name: string; description?: string}) => {
        return await prisma.category.create({
            data,
        });
    },

    update: async (category_id: number, data: {category_name?: string; description?: string}) => {
        return await prisma.category.update({
            where: {category_id},
            data,
        });
    },

    delete: async (category_id: number) => {
        return await prisma.category.delete({
            where: {category_id},
        });
    },
};

export default productCategoryRepository;