import { TransactionStockEnum, TransactionStockReasonEnum } from "../../enum/stock/transaction-stock.enum";
interface TransactionStock {
  stock_id: string;
  change_qty: number;
}

interface CreateTransactionStockInterface extends TransactionStock {
   transaction_type: TransactionStockEnum;
   reason?: TransactionStockReasonEnum;
}

interface UpdateTransactionStockInterface {
   transactionType?: TransactionStockEnum;
   stock_id?: string;
   reason?: TransactionStockReasonEnum;   
   change_qty?: number;
}

export { TransactionStock, CreateTransactionStockInterface, UpdateTransactionStockInterface };