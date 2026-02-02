import prisma from "../../../shared/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import {
  createProductStockInterface,
  updateProductStockInterface,
} from "../../../shared/types/interface/stock/product-stock.interface";
import { getAllProduct } from "../../product/controller/product.controller";
const productStockRepository = {
  getProductStock: async (stock_id: string) => {
    return await prisma.productStock.findUnique({
      where: { stock_id },
    });
  },
  getAllProductStock: async (
    tx: Prisma.TransactionClient,
    product_id: string[],
  ) => {
    return await tx.productStock.findMany({
      where: {
        product_id: {
          in: product_id,
        },
      },
    });
  },
  createProductStock: async (data: createProductStockInterface) => {
    return await prisma.productStock.create({
      data,
    });
  },
  applyStockChange: async (
    tx: Prisma.TransactionClient,
    stock_id: string,
    change_qty: number,
  ) => {
    return await tx.productStock.update({
      where: { stock_id },
      data: {
        stock_qty: {
          increment: change_qty,
        },
        reserved_qty: {
          decrement: change_qty,
        },
      },
    });
  },
  applyReserveStockChangeQueryRaw: async (
    tx: Prisma.TransactionClient,
    updateReservationData: Prisma.Sql[],
  ) => {
    return await tx.$executeRaw`
  UPDATE public."ProductStock" ps
  SET reserved_qty = reserved_qty + v.qty::int
  FROM (
    VALUES ${Prisma.join(updateReservationData)}
  ) AS v(stock_id, qty)
  WHERE ps.stock_id = v.stock_id
    AND ps.stock_qty - ps.reserved_qty >= v.qty::int
`;
  },
  applyProductStockChangeQueryRaw: async (
     tx: Prisma.TransactionClient,
      updateProductStockData: Prisma.Sql[],
  )=>{
    return await tx.$executeRaw`
    UPDATE public."ProductStock" ps
    SET stock_qty = stock_qty + v.qty::int
    FROM (
      VALUES ${Prisma.join(updateProductStockData)}
    ) AS v(stock_id, qty)
    WHERE ps.stock_id = v.stock_id
    `
  },

  deleteProductStock: async (stock_id: string) => {
    return await prisma.productStock.delete({
      where: { stock_id },
    });
  },
};

export default productStockRepository;
