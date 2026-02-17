import { getAllProductColorsByProductId, getProductColorById, createProductColor, deleteProductColor } from "../controller/productColor.controller";
import { Router } from "express";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
const router = Router({
    mergeParams: true
});

router.get("/", getAllProductColorsByProductId);
router.get("/:color_id", getProductColorById);
router.post("/",sessionAuth,requireRole('seller','admin'), createProductColor);
router.delete("/:color_id",sessionAuth,requireRole('seller','admin'), deleteProductColor);

export default router;