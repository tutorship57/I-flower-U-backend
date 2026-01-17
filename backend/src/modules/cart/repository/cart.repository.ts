import prisma from "../../../shared/prisma/prismaClient";
const cartRepository = {
    getCartByUserId: async (user_id: string) => {
        return await prisma.cart.findUnique({
            where: {user_id},
            include: {
                items: true,
            },
        });
    },
    createCart: async (data: {user_id: string;}) => {
        return await prisma.cart.create({
            data,
        });
    },
    deleteCart: async (user_id: string) => {
        return await prisma.cart.delete({
            where: {user_id},
        });
    },
};

export default cartRepository;