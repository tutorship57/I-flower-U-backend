import { Router } from 'express';
import { login, register,logout} from '../controller/auth.controller';
const router = Router();

router.post('/login', login);/* #swagger.tags = ['Auth'] */
router.post('/register', register);/* #swagger.tags = ['Auth'] */
router.post('/logout', logout);/* #swagger.tags = ['Auth'] */

export default router;