import { getProductStockController, createProductStockController, deleteProductStockController } from "../controller/product-stock.controller";
import { Router } from "express";
import stockTransactionRouter from "./transaction-stock.route";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { productResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
const router = Router({
    mergeParams: true,
});

router.get("/:stock_id",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, getProductStockController);
// router.post("/",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, createProductStockController);
// router.delete("/:stock_id", deleteProductStockController);


router.use("/:stock_id/transactions",stockTransactionRouter );

export default router;