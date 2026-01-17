
import { Router } from "express";
import { cancelOrderController, deleteOrderController,getOrderByIdController, getOrdersController,updateOrderStatusController } from "../controller/order.controller";
import orderItemRouter from "./orderItem.route";
const router = Router();

router.get('/',getOrdersController); 
router.get('/:order_id', getOrderByIdController);
router.put('/:order_id', updateOrderStatusController);
router.post('/:order_id/cancel', cancelOrderController);
router.delete('/:order_id', deleteOrderController);
router.use('/:order_id/item', orderItemRouter);


export default router;