import { getCartByUserId, createCart, deleteCart } from "../controller/cart.controller";
import { Router } from "express";
import cartItemRouter from './cartItem.route'
import { sessionAuth } from "../../../shared/guards/session.guard";
import { requireRole } from "../../../shared/guards/role.guard";
import { userResourceOwnershipGuard } from "../../../shared/guards/ownership.guard";
const router = Router();

router.get('/:user_id',sessionAuth,requireRole('user'),userResourceOwnershipGuard,getCartByUserId);
router.post('/', createCart);
// router.delete('/:user_id',sessionAuth,requireRole('user'),ownershipGuard,deleteCart);
router.use('/:cart_id/cart-item',sessionAuth,requireRole('user'),userResourceOwnershipGuard,cartItemRouter);


export default router;