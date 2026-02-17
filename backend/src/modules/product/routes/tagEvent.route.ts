import { sessionAuth } from '../../../shared/guards/session.guard';
import  { createTagEvent, getAllTagEvents, getTagEvent, updateTagEvent, deleteTagEvent } from '../controller/tagEvent.controller';
import { Router } from 'express';
import { requireRole } from '../../../shared/guards/role.guard';

const router = Router();

router.get('/', getAllTagEvents);
router.get('/:tagEvent_id', getTagEvent);
router.post('/',sessionAuth,requireRole('admin'),createTagEvent);
router.put('/:tagEvent_id',sessionAuth,requireRole('admin'), updateTagEvent);
router.delete('/:tagEvent_id',sessionAuth,requireRole('admin'), deleteTagEvent);

export default router;
