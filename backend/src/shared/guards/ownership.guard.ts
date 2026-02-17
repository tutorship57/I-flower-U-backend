import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appErrorCustomize.util';
import { getProductOwnerShipService } from '../../modules/product/service/product.service';


export const userResourceOwnershipGuard = () => {
  return (req: Request, res: Response, next: NextFunction) => {


    const userRole = req.session?.user_id;
    const searchedUserId = req.params.user_id;
    
    if(userRole === 'admin') return next();

    if (userRole !== searchedUserId) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }
    next();
  };
};

export const productResourceOwnershipGuard =() => {
  return async (req: Request, res: Response, next: NextFunction) => {
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
};