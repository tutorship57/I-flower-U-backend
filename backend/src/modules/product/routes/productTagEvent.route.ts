import { createProductTagEvent, getAllProductTagEvents, getProductTagEventsByProductId, updateProductTagEvent, deleteProductTagEvent } from "../controller/productTagEvent.controller";


import { Router } from "express";

const router = Router({
    mergeParams: true
});

router.get("/", getAllProductTagEvents);
router.get("/:tag_id", getProductTagEventsByProductId);
router.post("/", createProductTagEvent);
router.put("/", updateProductTagEvent);
router.delete("/:tag_id", deleteProductTagEvent);

export default router;