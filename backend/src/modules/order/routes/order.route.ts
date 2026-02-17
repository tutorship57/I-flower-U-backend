
import { Router } from "express";
import {  deleteOrderController,getOrderByIdController, getOrdersController} from "../controller/order.controller";
import orderItemRouter from "./orderItem.route";
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { userResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
const router = Router();

router.get('/',getOrdersController); 
router.get('/:order_id',sessionAuth,requireRole('user','admin'),getOrderByIdController);
// router.put('/:order_id', updateOrderStatusController);
// router.post('/:order_id/cancel', cancelOrderController);
// router.delete('/:order_id', deleteOrderController);
router.use('/:order_id/items',sessionAuth,requireRole('user','admin'),orderItemRouter);


export default router;