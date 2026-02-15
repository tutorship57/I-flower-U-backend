import { getOrderItemsByOrderId,getOrderItemsController, createOrderItem, updateOrderItem, deleteOrderItem } from "../controller/orderItem.controller";
import { Router } from "express";

const router = Router({
    mergeParams: true
});

router.get('/', getOrderItemsByOrderId);
router.post('/', createOrderItem);
router.put('/:item_id', updateOrderItem);
router.delete('/:item_id', deleteOrderItem);

export default router; 