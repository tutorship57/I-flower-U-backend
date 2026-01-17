import { Router } from "express";
import { getRoles ,editRole,deleteRole,createRole,getRoleById} from "../controller/role.controller";
const router = Router();    

router.get('/',getRoles )
router.get('/:roleId', getRoleById )
router.post('/', createRole)
router.put('/:roleId', editRole)
router.delete('/:roleId', deleteRole)

export default router;