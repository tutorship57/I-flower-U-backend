import { getCartByUserId, createCart, deleteCart } from "../controller/cart.controller";
import { Router } from "express";

const router = Router();

router.get('/:user_id', getCartByUserId);
router.post('/', createCart);
router.delete('/:user_id', deleteCart);

export default router;