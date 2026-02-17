import {Router } from "express";
import { getAllCategory,getCategory, createCategory,updateCategory,deleteCategory} from "../controller/category.controller";
import { requireRole } from "../../../shared/guards/role.guard";
import { sessionAuth } from "../../../shared/guards/session.guard";
const router = Router();

router.get('/', getAllCategory);
router.get('/:categoryId', getCategory);
router.post('/',sessionAuth,requireRole('admin'), createCategory);
router.put('/:categoryId',sessionAuth,requireRole('admin'), updateCategory);
router.delete('/:categoryId',sessionAuth,requireRole('admin'), deleteCategory);
export default router;