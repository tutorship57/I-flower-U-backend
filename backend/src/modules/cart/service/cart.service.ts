import cartRepository from "../repository/cart.repository";
import { AppError } from '../../../shared/utils/appErrorCustomize.util';

const getCartByUserIdService = async (user_id: string) => {
    const existingCart = await cartRepository.getCartByUserId(user_id);
    if (!existingCart) {
        throw new AppError('Cart not found for this user', 404);
    }
    return existingCart;
}

const createCartService = async (data: {user_id: string;}) => {
    const existingCart = await cartRepository.getCartByUserId(data.user_id);
    if (existingCart) {
        throw new AppError('Cart already exists for this user', 400);
    }
    const newCart = await cartRepository.createCart(data);
    return newCart;
}

const deleteCartService = async (user_id: string) => {
    const existingCart = await cartRepository.getCartByUserId(user_id);
    if (!existingCart) {
        throw new AppError('Cart not found for this user', 404);
    }
    const deletedCart = await cartRepository.deleteCart(user_id);
    return deletedCart;
}

export {getCartByUserIdService, createCartService, deleteCartService};  