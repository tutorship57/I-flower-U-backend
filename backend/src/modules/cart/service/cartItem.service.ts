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

const updateCartItemService = async (cart_id: string,product_id: string, data: {quantity?: number;}) => {
    const existingCartItem = await cartItemRepository.getCartItemsByCartId(cart_id);
    if (!existingCartItem) {
        throw new AppError('Cart Item not found', 404);
    }
    return await cartItemRepository.updateCartItem(cart_id,product_id, data);
}

const updateCartItemQuantityService = async (cart_id: string,product_id: string, quantity: number) => {
    const existingCartItem = await cartItemRepository.getCartItemsByCartId(product_id);
    if (!existingCartItem) {
        throw new AppError('Cart Item not found', 404);
    }
    return await cartItemRepository.updateCartItemQuantity(cart_id,product_id, quantity);
}

const deleteCartItemService = async (cart_id: string,product_id: string) => {
    const existingCartItem = await cartItemRepository.getCartItemById(cart_id,product_id);
    if (!existingCartItem) {
        throw new AppError('Cart Item not found', 404);
    }
    return await cartItemRepository.deleteCartItem(cart_id,product_id);
}

const deleteAllCartItemsService = async (cart_id: string) => {
    
    return await cartItemRepository.deleteAllCartItems(cart_id);
}

export {getCartItemsByCartIdService, updateCartItemQuantityService,getAggregateCartItemsByCartIdService, createCartItemService, updateCartItemService, deleteCartItemService, deleteAllCartItemsService};