import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { deleteOrderService,updateOrderStatusService ,getOrderByIdService,getAllOrdersService} from "../service/order.service";
import { Request, Response } from "express";
import { OrderStatusEnum } from "../../../shared/types/enum/order/orderStatus";

const getOrdersController = asyncHandler(async (req: Request, res: Response) => { 
    const orders = await getAllOrdersService(); 
    return res.status(200).json({ data: orders });
});

const getOrderByIdController =asyncHandler(async (req: Request, res: Response) => { 
    const { order_id } = req.params;
    const order = await getOrderByIdService(order_id); 
    return res.status(200).json({ data: order });
});

const cancelOrderController =asyncHandler(async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const updatedOrder = await updateOrderStatusService(order_id, OrderStatusEnum.CANCEL); 
    return res.status(200).json({ data: updatedOrder });
});

const updateOrderStatusController =asyncHandler(async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const { order_status } = req.body;
    const updatedOrder = await updateOrderStatusService(order_id, order_status);
    return res.status(200).json({data: updatedOrder });
});

const deleteOrderController =asyncHandler(async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const deletedOrder = await deleteOrderService(order_id);
    return res.sendStatus(204);
});


export { cancelOrderController,getOrdersController, deleteOrderController,getOrderByIdController,updateOrderStatusController};