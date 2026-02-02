import { getStockTransactionsController, createStockTransactionController, deleteStockTransactionController } from "../controller/transaction-stock.controller";
import { Router } from "express";

const router = Router({
    mergeParams: true,
});

router.get('/:stock_id/transactions', getStockTransactionsController);
router.post('/:stock_id/transactions', createStockTransactionController);
router.delete('/:stock_id/transactions/:transaction_id', deleteStockTransactionController);

export default router;
