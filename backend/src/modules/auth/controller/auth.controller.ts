import type { Request, Response,NextFunction } from 'express';
import { registerService,loginService } from '../service/auth.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';

const login = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    const {user_email, user_password}= req.body;
    const user = await loginService( user_email, user_password );
    req.session.user_id = user.user_id;
    req.session.user_role = user.role.role_name;  
    console.log(req.session);
    return res.status(200).json({message: 'Login successful',data:user});
});

const register = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    const {user_name,user_email,user_password} = req.body;
    console.log("this is register",req.body);
    const newUser = await registerService(user_name, user_email, user_password);
    return res.status(201).json({message: 'Registration successful',data: newUser});
});

const logout = asyncHandler(async (req: Request, res: Response) => {
    // #swagger.tags = ['Auth']
    req.session.destroy((err: Error) => {
        res.clearCookie('sid');
        return res.sendStatus(204);
    });
});

export  {login, register, logout};
