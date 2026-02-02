import type { Request,Response } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';

const getStockTransactionsController = asyncHandler( async (req: Request, res: Response) => {
    const { stock_id } = req.params;
    res.status(200).json({ message: 'Get Stock Transactions - To be implemented' });
});

const createStockTransactionController = asyncHandler( async (req: Request, res: Response) => {
    const { stock_id } = req.params;
    const data = req.body;
    res.status(201).json({ message: 'Create Stock Transaction - To be implemented' });
});


const deleteStockTransactionController = asyncHandler( async (req: Request, res: Response) => {
    const { transaction_id } = req.params;
    res.sendStatus(204);
});

export { getStockTransactionsController, createStockTransactionController,deleteStockTransactionController };