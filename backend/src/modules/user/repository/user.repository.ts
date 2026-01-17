
import prisma from '../../../shared/prisma/prismaClient';

const userRepository = {
    findAllUsers: async () => {
        return await prisma.user.findMany();
    },
    findUserById: async (user_id: string) => {
        return await prisma.user.findUnique({
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