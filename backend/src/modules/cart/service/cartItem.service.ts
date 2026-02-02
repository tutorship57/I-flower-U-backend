import cartItemRepository from "../repository/cartItem.repository";
import { AppError } from '../../../shared/utils/appErrorCustomize.util';

const getCartItemsByCartIdService = async (cart_id: string) => {
    const cartItems = await cartItemRepository.getCartItemsByCartId(cart_id);
    return cartItems;
}

const getAggregateCartItemsByCartIdService = async (cart_id: string) => {
    const cartItemsAggregate = await cartItemRepository.getCartItemsSumByCartId(cart_id);
    return cartItemsAggregate;
}

const createCartItemService = async (cart_id: string, data: { product_id: string; quantity: number; unit_price: number;}) => {
    const existingCartItem = await cartItemRepository.findCartItemByCartAndProduct(cart_id, data.product_id);
    const createData = { cart_id, ...data };
    if (existingCartItem) {
        throw new AppError('Product already in cart', 400);
    }
    const newCartItem = await cartItemRepository.createCartItem(createData);
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

export {getCartItemsByCartIdService, getAggregateCartItemsByCartIdService, createCartItemService, updateCartItemService, deleteCartItemService, deleteCartManyItemsService};