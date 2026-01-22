import { getAllProductColorsByProductId, getProductColorById, createProductColor, deleteProductColor } from "../controller/productColor.controller";
import { Router } from "express";

const router = Router({
    mergeParams: true
});

router.get("/", getAllProductColorsByProductId);
router.get("/:color_id", getProductColorById);
router.post("/", createProductColor);
router.delete("/:color_id", deleteProductColor);

export default router;