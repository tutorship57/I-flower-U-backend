
import prisma from '../../../shared/prisma/prismaClient';

const userRepository = {
    findAllUsers: async () => {
        return await prisma.user.findMany();
    },
    findUserById: async (user_id: string) => {
        return await prisma.user.findUnique({
            select: {
                user_id: true,
                user_name: true,
                user_email: true,
                role: {
                    select: {
                        role_id: true,
                        role_name: true,
                    },
                },
            },
            where: {user_id},
        });
    },
    getUserProfile: async (user_id: string) => {
        return await prisma.user.findUnique({
               select:{
                user_id: true,
                user_name: true,
                user_email: true,
                role:{
                    select:{
                        role_id: true,
                        role_name: true,
                    }
                },
                shops:{
                    select:{
                        shop_id: true,
                        shop_name: true
                    }
                },
                carts:{
                    select:{
                        cart_id: true,
                        },
                    }
            },
            where: {user_id},
        });
    },
    findUserByEmail: async (user_email: string) => {
        return await prisma.user.findUnique({
            where: {user_email},
        });
    },

    createUser: async (data: {user_name: string; user_email: string; user_password: string, role_id: number}) => {
        return await prisma.user.create({
            data,
        });
    },

    updateUser: async (user_id: string, data: {user_name?: string; user_email?: string; user_password?: string, role_id?: number}) => {
        return await prisma.user.update({
            where: {user_id},
            data,
        });
    },

    deleteUser: async (user_id: string) => {
        return await prisma.user.delete({
            where: {user_id},
        });
    },
};      




export {userRepository}