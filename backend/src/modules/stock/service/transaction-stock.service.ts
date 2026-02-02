import { Prisma } from "@prisma/client";
import { CreateTransactionStockInterface } from "../../../shared/types/interface/stock/transaction-stock.interface";
import stockTransactionRepository from "../repository/tracsaction-stock.repository";

const getStockTransactionsService = async (stock_id: string) => {
    return await stockTransactionRepository.getStockTransactions(stock_id);
}

const createStockTransactionService = async (tx:Prisma.TransactionClient, data:CreateTransactionStockInterface) => {
    if(!data.stock_id){
        throw new Error("Stock ID is required");
    }
    return await stockTransactionRepository.createTransactionChange(tx,data);
}

const createManyStockTransactionService = async (tx:Prisma.TransactionClient, data:CreateTransactionStockInterface[]) => {
    return await stockTransactionRepository.createManyTransactionChange(tx,data);
}

const deleteStockTransactionService = async (transaction_id: string) => {
    return await stockTransactionRepository.deleteStockTransaction(transaction_id);
}

export {getStockTransactionsService,createManyStockTransactionService,createStockTransactionService,deleteStockTransactionService}