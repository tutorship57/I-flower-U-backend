import prisma from '../../../shared/prisma/prismaClient';

const roleRepository = {
    findAllRoles: async () => {
        return await prisma.role.findMany();
    },
    findRoleById: async (role_id: number) => {
        return await prisma.role.findUnique({
            where: {role_id},
        });
    },
    findRoleByName: async (role_name: string) => {    
        return await prisma.role.findUnique({
            where: {role_name},
        }); 
    },
    createRole: async (data: {role_name: string}) => {
        return await prisma.role.create({
            data,
        });
    },
    updateRole: async (role_id: number, data: {role_name: string}) => {
        return await prisma.role.update({
            where: {role_id},
            data,
        });
    },
    deleteRole: async (role_id: number) => {
        return await prisma.role.delete({
            where: {role_id},
        });
    },
};

   

  



export {roleRepository}