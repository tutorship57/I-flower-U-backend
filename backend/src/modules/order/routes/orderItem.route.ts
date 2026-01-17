import { getOrderItemsByOrderId, createOrderItem, updateOrderItem, deleteOrderItem } from "../controller/orderItem.controlller";
import { Router } from "express";

const router = Router();

router.get('/', getOrderItemsByOrderId);
router.post('/', createOrderItem);
router.put('/:item_id', updateOrderItem);
router.delete('/:item_id', deleteOrderItem);

export default router; 