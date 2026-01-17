import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err:any, req:Request,res:Response,next:NextFunction) => {
    console.log(err)
    const statusCode =
    err.statusCode && typeof err.statusCode === 'number'
    ? err.statusCode
    : 500;

    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
    status: 'error',
    message,
    });
}