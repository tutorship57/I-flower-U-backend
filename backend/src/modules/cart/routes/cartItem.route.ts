import {getCartItemsByCartIdController, createCartItemController, updateCartItemController, updateCartItemQuantityController,deleteCartItemController,getAggregateCartItemController, deleteAllCartItemsController, getCartItemByProductIdController} from "../controller/cartItem.controller";
import { Router } from "express";

const router = Router({
    mergeParams: true,
});

router.get('/', getCartItemsByCartIdController);
router.get('/:product_id',getCartItemByProductIdController)
router.get('/aggregate', getAggregateCartItemController);
router.post('/', createCartItemController);
router.put('/:product_id', updateCartItemController);
router.patch('/:product_id', updateCartItemQuantityController);
router.delete('/:product_id', deleteCartItemController);
router.delete('/',deleteAllCartItemsController)

export default router;