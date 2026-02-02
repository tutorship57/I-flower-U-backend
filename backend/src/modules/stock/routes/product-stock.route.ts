import { getProductStockController, createProductStockController, deleteProductStockController } from "../controller/product-stock.controller";
import { Router } from "express";
import stockTransactionRouter from "./transaction-stock.route";
const router = Router({
    mergeParams: true,
});

router.get("/:stock_id", getProductStockController);
router.post("/", createProductStockController);
router.delete("/:stock_id", deleteProductStockController);


router.use("/:stock_id/transactions",stockTransactionRouter );

export default router;