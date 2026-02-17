import {Router } from "express";
import { createMultipleProductImage,createMocksProductImage, getImagesByProductId, updateProductImage, deleteProductImage} from "../controller/productImage.controller";
import { upload } from "../../../shared/middleware/multer.Middleware";
import { productResourceOwnershipGuard, userResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
const router = Router({
    mergeParams: true
});

router.get('/', getImagesByProductId);
// router.post('/mock-images', createMocksProductImage);
router.post('/',sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, upload.array('product_images',5),createMultipleProductImage); // ต้องใส่ ชื่อเดียวกับที่ front ส่งมา    
router.put('/:image_id',sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, updateProductImage);
router.delete('/:image_id',sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, deleteProductImage);
  
export default router;