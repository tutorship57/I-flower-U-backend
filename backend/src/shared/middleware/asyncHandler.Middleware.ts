import type { Request, Response, NextFunction, RequestHandler } from 'express';
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>):RequestHandler  =>{
  return async (req: Request, res: Response, next: NextFunction) => {
    try{ await fn(req, res, next); }catch(err){ next(err); }
    // Promise.resolve(fn(req, res, next)).catch(next);
    };
}; 

// export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
//    (req: Request, res: Response, next: NextFunction) => {
    
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };