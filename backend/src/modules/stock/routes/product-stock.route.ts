import { getProductStockController, createProductStockController, deleteProductStockController } from "../controller/product-stock.controller";
import { Router } from "express";
import stockTransactionRouter from "./transaction-stock.route";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { productResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
import stockReservationRouter from "./reservation-stock.route"
const router = Router({
    mergeParams: true,
});

router.get("/:stock_id",sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, getProductStockController);

router.use("/:stock_id/transactions",stockTransactionRouter );
router.use("/:stock_id/reservations",stockReservationRouter)
export default router;