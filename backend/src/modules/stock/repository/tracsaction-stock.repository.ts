import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma/prismaClient";
import {
  CreateTransactionStockInterface,
  UpdateTransactionStockInterface,
} from "../../../shared/types/interface/stock/transaction-stock.interface";

const stockTransactionRepository = {
  getStockTransactions: async (stock_id: string) => {
    return await prisma.transactionStock.findMany({
      where: { stock_id },
      orderBy: { created_at: "desc" },
    });
  },
  createTransactionChange: async (
    tx: Prisma.TransactionClient,
    data: CreateTransactionStockInterface
  ) => {
    return await tx.transactionStock.create({
      data,
    });
  }
  ,
  createManyTransactionChange: async (
    tx: Prisma.TransactionClient,
    data: CreateTransactionStockInterface[]
  ) => {
    return await tx.transactionStock.createMany({
      data,
    });
  },

  deleteStockTransaction: async (transaction_id: string) => {
    return await prisma.transactionStock.delete({
      where: { transaction_id },
    });
  },
};

export default stockTransactionRepository;
