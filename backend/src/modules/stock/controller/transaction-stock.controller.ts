import type { Request,Response } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { getStockTransactionsService } from '../service/transaction-stock.service';

const getStockTransactionsController = asyncHandler( async (req: Request, res: Response) => {
    // #swagger.tags = ['TransactionStock']
    const { stock_id } = req.params;
    const transactions = getStockTransactionsService(stock_id);
    res.status(200).json({ data:transactions });
});

const createStockTransactionController = asyncHandler( async (req: Request, res: Response) => {
    // #swagger.tags = ['TransactionStock']
    const { stock_id } = req.params;
    const data = req.body;
    res.status(201).json({ message: 'Create Stock Transaction - To be implemented' });
});


const deleteStockTransactionController = asyncHandler( async (req: Request, res: Response) => {
    // #swagger.tags = ['TransactionStock']
    const { transaction_id } = req.params;
    res.sendStatus(204);
});

export { getStockTransactionsController, createStockTransactionController,deleteStockTransactionController };