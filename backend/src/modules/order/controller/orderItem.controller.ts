import { getOrderItemByIdService, getOrderItemsByOrderIdService,getOrderItemsService, createOrderItemService, updateOrderItemService, deleteOrderItemService, createManyOrderItemService } from "../service/orderItem.service";

import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";

const getOrderItemById = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const orderItem = await getOrderItemByIdService(item_id);
    const message = orderItem ? 'Order item fetched successfully' : 'Order item not found';
    return res.status(200).json({ message, orderItem });
});

const getOrderItemsController = asyncHandler( async (req: Request, res: Response ) => {
    const ReqQueryFilter = req.query;
    const orderItems = await getOrderItemsService(ReqQueryFilter);
    return res.status(200).json({ data: orderItems });
})

const getOrderItemsByOrderId = asyncHandler( async (req: Request, res: Response ) => {
    const { order_id } = req.params;
    const orderItems = await getOrderItemsByOrderIdService(order_id);
    return res.status(200).json({data: orderItems});
});

const createOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const data = req.body;
    const newOrderItem = await createOrderItemService(data);
    return res.status(201).json({ data: newOrderItem });
});

// const createManyOrderItems = asyncHandler( async (req: Request, res: Response ) => {
//     const data = req.body;
//     if (!Array.isArray(data) || data.length === 0) {
//         throw new AppError("Request body must be a non-empty array", 400);
//     }
//     const newOrderItems = await createManyOrderItemService(data);
//     const message = 'Order items created successfully';
//     return res.status(201).json({ message, orderItems: newOrderItems });
// });

const updateOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const data = req.body;
    const updatedOrderItem = await updateOrderItemService(item_id, data);

    return res.status(200).json({ data: updatedOrderItem });
});

const deleteOrderItem = asyncHandler( async (req: Request, res: Response ) => {
    const { item_id } = req.params;
    const deletedOrderItem = await deleteOrderItemService(item_id);
    return res.status(204);
});

export { getOrderItemById, getOrderItemsController,getOrderItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem };