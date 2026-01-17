import {createColorType, getAllColorTypes, getColorType, updateColorType, deleteColorType } from '../controller/colorType.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllColorTypes);
router.get('/:colorType_id', getColorType);
router.post('/', createColorType);
router.put('/:colorType_id', updateColorType);
router.delete('/:colorType_id', deleteColorType);

export default router;