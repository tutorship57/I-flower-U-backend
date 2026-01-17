import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import {getCartItemsByCartIdService, createCartItemService, updateCartItemService, deleteCartItemService} from "../service/cartItem.service";

const getCartItemsByCartId = asyncHandler(async (req: Request, res: Response) => {
    const cart_id = req.params.cart_id;
    const cartItems = await getCartItemsByCartIdService(cart_id);
    return res.status(200).json({
        data:cartItems
    });
});

const createCartItem = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const newCartItem = await createCartItemService(data);
    return res.status(201).json({
        data: newCartItem
    });
});

const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
    const cart_item_id = req.params.cart_item_id;
    const data = req.body;
    const updatedCartItem = await updateCartItemService(cart_item_id, data);
    return res.status(200).json({
        data: updatedCartItem
    });
});

const deleteCartItem = asyncHandler(async (req: Request, res: Response) => {
    const cart_item_id = req.params.cart_item_id;
    const deletedCartItem = await deleteCartItemService(cart_item_id);
    return res.sendStatus(204);
});

export {getCartItemsByCartId, createCartItem, updateCartItem, deleteCartItem};