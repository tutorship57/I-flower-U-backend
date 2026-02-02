import {getCartItemsByCartId, createCartItem, updateCartItem, deleteCartItem, getAggregateCartItem} from "../controller/cartItem.controller";
import { Router } from "express";

const router = Router({
    mergeParams: true,
});

router.get('/', getCartItemsByCartId);
router.get('/aggregate', getAggregateCartItem);
router.post('/', createCartItem);
router.put('/:cart_item_id', updateCartItem);
router.delete('/:cart_item_id', deleteCartItem);

export default router;