import { Request,Response } from "express";
import { createShopController,updateShopController,deleteShopController,getShopByIdController } from "../controller/shop.controller";
import { Router } from "express";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";

const router = Router();

router.get("/:shop_id", getShopByIdController);
router.post("/",sessionAuth, createShopController);
router.put("/:shop_id",sessionAuth,requireRole('seller','admin'), updateShopController);
router.delete("/:shop_id",sessionAuth,requireRole('seller','admin'),deleteShopController);

export default router;