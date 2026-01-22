import  { createTagEvent, getAllTagEvents, getTagEvent, updateTagEvent, deleteTagEvent } from '../controller/tagEvent.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllTagEvents);
router.get('/:tagEvent_id', getTagEvent);
router.post('/', createTagEvent);
router.put('/:tagEvent_id', updateTagEvent);
router.delete('/:tagEvent_id', deleteTagEvent);

export default router;
