import prisma from '../../../shared/prisma/prismaClient';

const colorTypeRepository = {
    getAllColorTypes: async () => {
        return await prisma.colorType.findMany();
    },
    findColorTypeById: async (color_id: number) => {
        return await prisma.colorType.findUnique({
            where: {color_id},
        });
    },
    findColorTypeByName: async (color_name: string) => {
        return await prisma.colorType.findUnique({
            where: {color_name},
        });
    },
    createColorType: async (data: {color_name: string;}) => {
        return await prisma.colorType.create({
            data,
        });
    },
    updateColorType: async (color_id: number, data: {color_name?: string;}) => {
        return await prisma.colorType.update({
            where: {color_id},
            data,
        });
    },
    deleteColorType: async (color_id: number) => {
        return await prisma.colorType.delete({
            where: {color_id},
        });
    },
};

export default colorTypeRepository;