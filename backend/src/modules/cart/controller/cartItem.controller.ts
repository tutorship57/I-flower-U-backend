import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import {getCartItemsByCartIdService, createCartItemService, updateCartItemService,updateCartItemQuantityService,deleteCartItemService, getAggregateCartItemsByCartIdService, deleteAllCartItemsService, getCartItemByProductIdService} from "../service/cartItem.service";

const getCartItemsByCartIdController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const cart_id = req.params.cart_id;
    const cartItems = await getCartItemsByCartIdService(cart_id);
    return res.status(200).json({
        data:cartItems
    });
});

const getCartItemByProductIdController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const {cart_id,product_id} = req.params
    const cartItem = await getCartItemByProductIdService(cart_id,product_id)
    return res.status(200).json({
        data:cartItem
    });
});

const getAggregateCartItemController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const cart_id = req.params.cart_id;
    const cartItemsAggregate = await getAggregateCartItemsByCartIdService(cart_id);
    return res.status(200).json({
        data:cartItemsAggregate
    });
});

const createCartItemController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const data = req.body;
    const cart_id = req.params.cart_id;
    const newCartItem = await createCartItemService(cart_id,data);
    return res.status(201).json({
        data: newCartItem
    });
});

const updateCartItemController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const {cart_id,product_id} = req.params;
    const data = req.body;
    const updatedCartItem = await updateCartItemService(cart_id,product_id, data);
    return res.status(200).json({
        data: updatedCartItem
    });
});

const updateCartItemQuantityController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const {product_id,cart_id}= req.params;
    const {quantity} =req.body
    const updatedCartItem = await updateCartItemQuantityService(cart_id,product_id,quantity);
    return res.status(200).json({
        data: updatedCartItem
    });
})

const deleteCartItemController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const {cart_id,product_id} = req.params;
    const deletedCartItem = await deleteCartItemService(cart_id,product_id);
    return res.sendStatus(204);
});

const deleteAllCartItemsController = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['CartItem']
    const {cart_id} = req.params;
    const deletedCartItems = await deleteAllCartItemsService(cart_id);
    return res.sendStatus(204);
});

export {getCartItemsByCartIdController,getCartItemByProductIdController,getAggregateCartItemController ,updateCartItemQuantityController,createCartItemController, updateCartItemController, deleteCartItemController,deleteAllCartItemsController};