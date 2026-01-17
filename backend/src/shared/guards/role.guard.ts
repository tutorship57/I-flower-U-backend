import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appErrorCustomize.util';



export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session?.user_role;

    if (!userRole || !roles.includes(userRole)) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }

    next();
  };
};