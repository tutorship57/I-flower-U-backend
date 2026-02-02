import type { Request,Response,NextFunction } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import {getProductStockService,createProductStockService,updateProductStockService,deleteProductStockService} from "../service/product-stock.service";
const getProductStockController = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const { stock_id } = req.params;
    const getProductStocks = await getProductStockService(stock_id);
    res.status(200).json({ data:getProductStocks });
});

const createProductStockController = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body ;
    const createProductStock = await createProductStockService(data); 
    res.status(201).json({ data:createProductStock });
});


const deleteProductStockController = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const { stock_id } = req.params;
    const deleteProductStock = await deleteProductStockService(stock_id);
    res.sendStatus(204);
});

export { getProductStockController, createProductStockController, deleteProductStockController };