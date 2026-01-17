import { Request,Response } from "express";
import { createShopController,updateShopController,deleteShopController,getShopByIdController } from "../controller/shop.controller";
import { Router } from "express";

const router = Router();

router.get("/:shop_id", getShopByIdController);
router.post("/", createShopController);
router.put("/:shop_id", updateShopController);
router.delete("/:shop_id", deleteShopController);

export default router;