import { Router } from "express";
import { getRoles ,editRole,deleteRole,createRole,getRoleById} from "../controller/role.controller";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
const router = Router();    

/**
 * @openapi
 * /api/role/:
 *   get:
 *     summary: get all row
 *     responses:
 *       200:
 *         description: สำเร็จ
 */
router.get('/',getRoles )
router.get('/:roleId', getRoleById )
router.post('/',sessionAuth,requireRole('admin'),createRole)
router.put('/:roleId',sessionAuth,requireRole('admin'),editRole)
router.delete('/:roleId',sessionAuth,requireRole('admin'),deleteRole)

export default router;