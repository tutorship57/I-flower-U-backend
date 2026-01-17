import { getOrderItemByIdService, getOrderItemsByOrderIdService, createOrderItemService, updateOrderItemService, deleteOrderItemService, createManyOrderItemService } from "../service/orderItem.service";

import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";

const getOrderItemById = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const orderItem = await getOrderItemByIdService(item_id);
    const message = orderItem ? 'Order item fetched successfully' : 'Order item not found';
    return res.status(200).json({ message, orderItem });
});

const getOrderItemsByOrderId = asyncHandler( async (req: Request, res: Response ) => {
    const { order_id } = req.params;
    const orderItems = await getOrderItemsByOrderIdService(order_id);
    const message = orderItems.length ? `Order items for order ${order_id} fetched successfully` : `No order items found for order ${order_id}`;
    return res.status(200).json({ message, orderItems });
});

const createOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const data = req.body;
    const newOrderItem = await createOrderItemService(data);
    const message = 'Order item created successfully';
    return res.status(201).json({ message, orderItem: newOrderItem });
});

const createManyOrderItems = asyncHandler( async (req: Request, res: Response ) => {
    const data = req.body;
    if (!Array.isArray(data) || data.length === 0) {
        throw new AppError("Request body must be a non-empty array", 400);
    }
    const newOrderItems = await createManyOrderItemService(data);
    const message = 'Order items created successfully';
    return res.status(201).json({ message, orderItems: newOrderItems });
});

const updateOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const data = req.body;
    const updatedOrderItem = await updateOrderItemService(item_id, data);
    const message = `Order item ${item_id} updated successfully`;
    return res.status(200).json({ message, orderItem: updatedOrderItem });
});

const deleteOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const deletedOrderItem = await deleteOrderItemService(item_id);
    const message = `Order item ${item_id} deleted successfully`;
    return res.status(200).json({ message, orderItem: deletedOrderItem });
});

export { getOrderItemById, getOrderItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem, createManyOrderItems };