import cartItemRepository from "../repository/cartItem.repository";
import { AppError } from '../../../shared/utils/appErrorCustomize.util';

const getCartItemsByCartIdService = async (cart_id: string) => {
    const cartItems = await cartItemRepository.getCartItemsByCartId(cart_id);
    return cartItems;
}

const createCartItemService = async (data: {cart_id: string; product_id: string; quantity: number; unit_price: number;}) => {
    const existingCartItem = await cartItemRepository.findCartItemByCartAndProduct(data.cart_id, data.product_id);
    if (existingCartItem) {
        throw new AppError('Product already in cart', 400);
    }
    const newCartItem = await cartItemRepository.createCartItem(data);
    return newCartItem;
}

const updateCartItemService = async (cart_item_id: string, data: {quantity?: number;}) => {
    const existingCartItem = await cartItemRepository.getCartItemsByCartId(cart_item_id);
    if (!existingCartItem) {
        throw new AppError('Cart Item not found', 404);
    }
    return await cartItemRepository.updateCartItem(cart_item_id, data);
}

const deleteCartItemService = async (cart_item_id: string) => {
    const existingCartItem = await cartItemRepository.getCartItemById(cart_item_id);
    if (!existingCartItem) {
        throw new AppError('Cart Item not found', 404);
    }
    return await cartItemRepository.deleteCartItem(cart_item_id);
}

const deleteCartManyItemsService = async (cart_id: string, product_ids: string[]) => {
    
    return await cartItemRepository.deleteManyCartItems(cart_id, product_ids);
}

export {getCartItemsByCartIdService, createCartItemService, updateCartItemService, deleteCartItemService, deleteCartManyItemsService};