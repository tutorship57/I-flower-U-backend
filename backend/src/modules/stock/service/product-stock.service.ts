import productStockRepository from "../repository/product-stock.repository";
import {createProductStockInterface,updateProductStockInterface} from "../../../shared/types/interface/stock/product-stock.interface";
import { Prisma } from "@prisma/client";
const getProductStockService = async (stock_id: string) => {
    return await productStockRepository.getProductStock(stock_id);
}
const getAllProductsStockServiceByProductId = async (tx:Prisma.TransactionClient,product_ids: string[]) => {
    return await productStockRepository.getAllProductStock(tx,product_ids);
}

const createProductStockService = async ( data:createProductStockInterface) => {
    if(!data.product_id){
        throw new Error("Product ID is required");
    }
    return await productStockRepository.createProductStock(data);
}

const updateProductStockService = async (tx:Prisma.TransactionClient,stock_id: string, change_qty: number) => {
    return await productStockRepository.applyStockChange(tx,stock_id, change_qty);
}

const updateReservationsQueryRawService = async (tx:Prisma.TransactionClient,updateReservationData:Prisma.Sql[]) => {
    return await productStockRepository.applyReserveStockChangeQueryRaw(tx,updateReservationData);
}

const updateProductStockQueryRawService = async (tx:Prisma.TransactionClient,updateProductStockData:Prisma.Sql[]) => {
    return await productStockRepository.applyProductStockChangeQueryRaw(tx,updateProductStockData);
}
const deleteProductStockService = async (stock_id: string) => {
    return await productStockRepository.deleteProductStock(stock_id);
}

export {getProductStockService,updateProductStockQueryRawService,createProductStockService,getAllProductsStockServiceByProductId,updateReservationsQueryRawService,updateProductStockService,deleteProductStockService}