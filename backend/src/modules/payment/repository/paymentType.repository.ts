import prisma from "../../../shared/prisma/prismaClient";

const paymentTypeRepository = {
    getAllPaymentTypes: async () => {
        return await prisma.payType.findMany();
    },

    getPaymentTypeById: async (paytype_id: number) => {
        return await prisma.payType.findUnique({
            where: { paytype_id },
        });
    },
    getPaymentTypeByName: async (paytype_name: string) => {
        return await prisma.payType.findUnique({
            where: { paytype_name },
        });
    },

    createPaymentType: async (data: { paytype_name: string; description: string }) => {
        return await prisma.payType.create({
            data,
        });
    },

    updatePaymentType: async (paytype_id: number, data: Partial<{ type_name: string; description: string }>) => {
        return await prisma.payType.update({
            where: { paytype_id },
            data,
        });
    },

    deletePaymentType: async (paytype_id: number) => {
        return await prisma.payType.delete({
            where: { paytype_id },
        });
    },
};

export default paymentTypeRepository;