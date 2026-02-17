import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appErrorCustomize.util';
import { getProductOwnerShipService } from '../../modules/product/service/product.service';
import { getCartByUserId } from '../../modules/cart/controller/cart.controller';
import { getCartByUserIdService } from '../../modules/cart/service/cart.service';

export const userResourceOwnershipGuard =  (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session?.user_id;
    const searchedUserId = req.params.user_id;
    
    if(userRole === 'admin') return next();

    if (userRole !== searchedUserId) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }
    next();
  };


export const productResourceOwnershipGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.session?.user_role;
      const userId = req.session?.user_id;
      const product_id = req.params.product_id;

      const product = await getProductOwnerShipService(product_id);
      const ownerProduct = product.shop.user_id;

      if (userRole === 'admin') return next();

      if (userId !== ownerProduct) {
        return next(new AppError("Forbidden: insufficient permissions", 403));
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export const cartResourceOwnershipGuard =  async (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session?.user_id;
    const userId = req.session?.user_id;
    const cartIdQueryParam = req.params.cart_id;

    const cart = await getCartByUserIdService(userId)
    const cartIdFromUserID = cart.cart_id ;

    if (userRole === 'admin') return next();

    if (cartIdQueryParam !== cartIdFromUserID) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }
    next();
  
};
