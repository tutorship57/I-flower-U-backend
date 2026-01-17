import {getCartItemsByCartId, createCartItem, updateCartItem, deleteCartItem} from "../controller/cartItem.controller";
import { Router } from "express";

const router = Router();

router.get('/:cart_id', getCartItemsByCartId);
router.post('/', createCartItem);
router.put('/:cart_item_id', updateCartItem);
router.delete('/:cart_item_id', deleteCartItem);

export default router;