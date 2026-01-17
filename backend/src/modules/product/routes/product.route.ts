import { upload } from "../../../shared/middleware/multer.Middleware";
import {Router } from "express";
import { createProduct,  getProductByIds,createManyProduct, deleteProduct,getAllProduct,getAllProductByShopID, getProductById, updateProduct } from "../controller/product.controller";
import productImageRouter from './productImage.route';
import colorTypeRouter from './colorType.route';
const router = Router();

router.get("/", getAllProduct);
router.get("/shop/:shop_id", getAllProductByShopID);
router.get("/:product_id", getProductById);
router.post('/ids', getProductByIds);
router.post("/bulk-create", createManyProduct);
router.post("/", upload.array('product_image',5), createProduct);
router.put("/:product_id", updateProduct);
router.delete("/:product_id", deleteProduct);

router.use('/:product_id/images', productImageRouter);
router.use('/:product_id/colors', colorTypeRouter);

export default router;