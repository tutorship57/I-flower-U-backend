import { createFlowerType, getAllFlowerTypes, getFlowerType, updateFlowerType, deleteFlowerType } from '../controller/flowerType.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllFlowerTypes);
router.get('/:type_id', getFlowerType);
router.post('/', createFlowerType);
router.put('/:type_id', updateFlowerType);
router.delete('/:type_id', deleteFlowerType);
export default router;