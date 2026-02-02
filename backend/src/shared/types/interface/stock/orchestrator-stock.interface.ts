import { TransactionStockEnum } from "../../enum/stock/transaction-stock.enum";

export interface reserveStockPayload {
    stock_id: string;
    change_qty: number;
    transaction_type: TransactionStockEnum;
}