import { createProductSetService, deleteProductSetService, findItemsBySetIdService } from "../service/productSet.service";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { Request, Response } from "express";
const createProductSetController =asyncHandler( async (req: Request, res: Response) => {
    const data: {set_id: string; item_id: string; quantity: number;}[] = req.body;
    const newProductSet = await createProductSetService(data);
    return res.status(201).json({
        data: newProductSet,
    });
})

const findItemsBySetIdController = asyncHandler( async (req: Request, res: Response) => {
    const {set_id} = req.params;
    const items = await findItemsBySetIdService(set_id);
    return res.status(200).json({
        data: items,
    });
})

const deleteProductSetController = asyncHandler( async (req: Request, res: Response) => {
    const {set_id, item_id} = req.params;
    await deleteProductSetService(set_id, item_id);
    return res.sendStatus(204);
})

export {createProductSetController, findItemsBySetIdController, deleteProductSetController};