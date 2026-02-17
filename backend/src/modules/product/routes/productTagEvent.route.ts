import { createProductTagEvent, getAllProductTagEvents, getProductTagEventsByProductId, updateProductTagEvent, deleteProductTagEvent } from "../controller/productTagEvent.controller";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { productResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";

import { Router } from "express";

const router = Router({
    mergeParams: true
});

router.get("/", getAllProductTagEvents);
router.get("/:tag_id", getProductTagEventsByProductId);
router.post("/",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard,createProductTagEvent);
router.put("/",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, updateProductTagEvent);
router.delete("/:tag_id",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, deleteProductTagEvent);

export default router;