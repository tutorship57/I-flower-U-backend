import {Router } from "express";
import { getAllCategory,getCategory, createCategory,updateCategory,deleteCategory} from "../controller/category.controller";
const router = Router();

router.get('/', getAllCategory);
router.get('/:categoryId', getCategory);
router.post('/', createCategory);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);
export default router;