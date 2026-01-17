import { AppError } from '../../../shared/utils/appErrorCustomize.util';
import { roleRepository } from '../repository/role.repository';


const getAllRolesService = async () => {
    return await roleRepository.findAllRoles();
}
const getRoleByIdService = async (role_id: number) => {
    return await roleRepository.findRoleById(role_id);
}
const createRoleService = async (data: {role_name: string}) => {
    const existingRole =  await roleRepository.findRoleByName(data.role_name);
    if (existingRole) {
        throw new AppError('Role with this name already exists', 400);
    }
    return await roleRepository.createRole(data);
}
const updateRoleService = async (role_id: number, data: {role_name?: string}) => {
    if (data.role_name) {
        const existingRole =  await roleRepository.findRoleByName(data.role_name);
        if (existingRole) {
            throw new AppError('Role with this name already exists', 400);
        }
    }
    return await roleRepository.updateRole(role_id, {role_name: data.role_name!});
}
const deleteRoleService = async (role_id: number) => {
    const existingRole = await roleRepository.findRoleById(role_id);
    if (!existingRole) {
        throw new AppError('Role not found', 404);
    }
    return await roleRepository.deleteRole(role_id);
}

export {getAllRolesService, getRoleByIdService, createRoleService, updateRoleService, deleteRoleService}