import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appErrorCustomize.util';
export const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        return next(new AppError('Unauthorized: Please log in to access this resource', 401));
    }
};