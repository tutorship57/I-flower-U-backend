import prisma from "../../../shared/prisma/prismaClient";

const cartItemRepository = {
    getCartItemById: async (cart_item_id: string) => {
        return await prisma.cartItem.findUnique({
            where: {cart_item_id},
        });
    },
    getCartItemsByCartId: async (cart_id: string) => {
        return await prisma.cartItem.findMany({
            where: {cart_id},
            include: {
            product: true,
            }
        });
    },
    findCartItemByCartAndProduct: async (cart_id: string, product_id: string) => {
        return await prisma.cartItem.findFirst({
            where: {cart_id, product_id},
        });
    },
    createCartItem: async (data: {cart_id: string; product_id: string; quantity: number;unit_price: number;}) => {
        return await prisma.cartItem.create({
            data,
        });
    },
    updateCartItem: async (cart_item_id: string, data: {quantity?: number;unit_price?: number;}) => {
        return await prisma.cartItem.update({
            where: {cart_item_id},
            data,
        });
    },
    deleteCartItem: async (cart_item_id: string) => {
        return await prisma.cartItem.delete({
            where: {cart_item_id},
        });
    },
    deleteManyCartItems: async (cart_id: string, product_ids: string[]) => {
        return await prisma.cartItem.deleteMany({
            where: {
                cart_id,
                product_id:{in: product_ids},
            },
        });
    }
};

export default cartItemRepository;