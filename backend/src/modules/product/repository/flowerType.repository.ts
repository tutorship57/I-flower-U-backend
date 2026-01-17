import prisma from '../../../shared/prisma/prismaClient';

const flowerRepository = {
    getAllFlowerTypes: async () => {
        return await prisma.flowerType.findMany();
    },
    findFlowerTypeById: async (type_id: number) => {
        return await prisma.flowerType.findUnique({
            where: {type_id},
        });
    },
    findFlowerTypeByName: async (type_name: string) => {
        return await prisma.flowerType.findUnique({
            where: {type_name},
        });
    },
    createFlowerType: async (data: {type_name: string;}) => {
        return await prisma.flowerType.create({
            data,
        });
    },
    updateFlowerType: async (type_id: number, data: {type_name?: string;}) => {
        return await prisma.flowerType.update({
            where: {type_id},
            data,
        });
    },
    deleteFlowerType: async (type_id: number) => {
        return await prisma.flowerType.delete({
            where: {type_id},
        });
    },
};

export default flowerRepository;