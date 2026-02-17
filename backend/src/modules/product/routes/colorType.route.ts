import {createColorType, getAllColorTypes, getColorType, updateColorType, deleteColorType } from '../controller/colorType.controller';
import { Router } from 'express';
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
const router = Router();

router.get('/', getAllColorTypes);
router.get('/:colorType_id', getColorType);
router.post('/',sessionAuth,requireRole('admin'), createColorType);
router.put('/:colorType_id',sessionAuth,requireRole('admin'), updateColorType);
router.delete('/:colorType_id',sessionAuth,requireRole('admin'), deleteColorType);

export default router;