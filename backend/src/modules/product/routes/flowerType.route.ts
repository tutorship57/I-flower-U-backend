import { createFlowerType, getAllFlowerTypes, getFlowerType, updateFlowerType, deleteFlowerType } from '../controller/flowerType.controller';
import { Router } from 'express';
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
const router = Router();

router.get('/', getAllFlowerTypes);
router.get('/:type_id', getFlowerType);
router.post('/',sessionAuth,requireRole('admin'), createFlowerType);
router.put('/:type_id',sessionAuth,requireRole('admin'), updateFlowerType);
router.delete('/:type_id',sessionAuth,requireRole('admin'), deleteFlowerType);
export default router;