import { getCartByUserId, createCart, deleteCart } from "../controller/cart.controller";
import { Router } from "express";
import cartItemRouter from './cartItem.route'

const router = Router();

router.get('/:user_id', getCartByUserId);
router.post('/', createCart);
router.delete('/:user_id', deleteCart);

router.use('/:cart_id/cart-item', cartItemRouter);


export default router;