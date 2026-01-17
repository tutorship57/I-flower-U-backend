import type { Request, Response,NextFunction } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { getAllRolesService ,getRoleByIdService, createRoleService,updateRoleService,deleteRoleService} from '../service/role.service';

const getRoles = asyncHandler(async (req: Request, res: Response) => {
    const roles = await getAllRolesService();
    return res.status(200).json({data: roles});
});
const getRoleById = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const role = await getRoleByIdService(Number(roleId));
    return res.status(200).json({data: role});
});
const createRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleName } = req.body;
    const newRole = await createRoleService({role_name: roleName});
    return res.status(201).json({data: newRole});
});

const editRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const { roleName } = req.body;
    const updatedRole = await updateRoleService(Number(roleId), {role_name: roleName});
    return res.status(200).json({data: updatedRole});
});


const deleteRole = asyncHandler(async (req: Request, res: Response) => {
    const { roleId } = req.params;
    const deletedRole = await deleteRoleService(Number(roleId));
    return res.sendStatus(204);
});


export  {getRoles,createRole, editRole, deleteRole,getRoleById};