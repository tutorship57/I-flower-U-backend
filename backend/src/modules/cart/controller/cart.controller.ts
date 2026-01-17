import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { getCartByUserIdService, createCartService, deleteCartService } from "../service/cart.service";

const getCartByUserId = asyncHandler(async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const cart = await getCartByUserIdService(user_id);
    res.status(200).json({
        data: cart
    });
});

const createCart = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const newCart = await createCartService(data);
    res.status(201).json({
        data: newCart
    });
});

const deleteCart = asyncHandler(async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    await deleteCartService(user_id);
    res.sendStatus(204);
});

export { getCartByUserId, createCart, deleteCart };