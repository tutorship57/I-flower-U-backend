import { getStockTransactionsController, createStockTransactionController, deleteStockTransactionController } from "../controller/transaction-stock.controller";
import { Router } from "express";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { productResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
const router = Router({
    mergeParams: true,
});

router.get('/:stock_id/transactions',sessionAuth,requireRole('seller','admin'),productResourceOwnershipGuard, getStockTransactionsController);
// router.post('/:stock_id/transactions', createStockTransactionController);
// router.delete('/:stock_id/transactions/:transaction_id', deleteStockTransactionController);

export default router;
