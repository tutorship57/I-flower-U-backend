import type { Request, Response,NextFunction } from 'express';
import { registerService,loginService } from '../service/auth.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';


const login = asyncHandler(async (req: Request, res: Response) => {
    const {email, password }= req.body;
    const user = await loginService( email, password );
    req.session.user_id = user.user_id;
    req.session.user_role = user.user_role;  
    return res.status(200).json({message: 'Login successful',data:user});
});

const register = asyncHandler(async (req: Request, res: Response) => {
    const {user_name,user_email,user_password} = req.body;
    const newUser = await registerService(user_name, user_email, user_password);
    return res.status(201).json({message: 'Registration successful',data: newUser});
});

const logout = asyncHandler(async (req: Request, res: Response) => {
    req.session.destroy((err: Error) => {
        res.clearCookie('sid');
        return res.sendStatus(204);
    });
});

export  {login, register, logout};
