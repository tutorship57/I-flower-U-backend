import prisma from '../../../shared/prisma/prismaClient';

const productSetRepository = {
    
    createProductSet: async (data: {set_id: string; item_id: string; quantity: number;}[]) => {
        return await prisma.productSet.createMany({
            data,
        });
    },
    findItemsBySetId: async (set_id: string) => {
        return await prisma.productSet.findMany({
            where: {set_id},
        });
    },
    findManyItemsBySetIds: async (set_ids: string[]) => {
        return await prisma.productSet.findMany({
            where: {
                set_id: {
                    in: set_ids,
                },
            },
        });
    },
    deleteProductSet: async (set_id: string, item_id: string) => {
        return await prisma.productSet.delete({
            where: {
                set_id_item_id: {
                    set_id,
                    item_id,
                },
            },
        });
    }
}

export default productSetRepository;