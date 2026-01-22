import prisma from '../../../shared/prisma/prismaClient';

const tagEventRepository = {
    getAllTagEvents: async () => {
        return await prisma.tagEvent.findMany();
    },
    getTagEventById: async (tag_id: number) => {
        return await prisma.tagEvent.findUnique({
            where: { tag_id },
        });
    },
    createTagEvent: async (data: { tag_event_name: string; }) => {
        return await prisma.tagEvent.create({   
            data,
        });
    },
    updateTagEvent: async (tag_id: number, data: { tag_event_name?: string; }) => {
        return await prisma.tagEvent.update({
            where: { tag_id },
            data,
        });
    },
    deleteTagEvent: async (tag_id: number) => {
        return await prisma.tagEvent.delete({
            where: { tag_id },
        });
    }
}

export default tagEventRepository;