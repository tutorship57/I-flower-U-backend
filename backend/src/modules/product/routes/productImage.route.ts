import {Router } from "express";
import { createMultipleProductImage,createMocksProductImage, getImagesByProductId, updateProductImage, deleteProductImage} from "../controller/productImage.controller";
import { upload } from "../../../shared/middleware/multer.Middleware";
const router = Router();

router.get('/', getImagesByProductId);
router.post('/mock-images', createMocksProductImage);
router.post('/', upload.array('product_image',5),createMultipleProductImage); // ต้องใส่ ชื่อเดียวกับที่ front ส่งมา    
router.put('/:image_id', updateProductImage);
router.delete('/:image_id', deleteProductImage);

export default router;