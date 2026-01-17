import { getAllUserService,getUserByIdService,updateUserService,deleteUserService, createUserService } from "../service/user.service";
import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
const getUserByIdController = asyncHandler( async (req: Request, res: Response) => {  
    const user_id = req.params.user_id;
    const result = await getUserByIdService(user_id);
    res.status(200).json({data: result});
});

const getAllUserController = asyncHandler( async (req: Request, res: Response) => {  
    const result = await getAllUserService();
    res.status(200).json({data: result});
});

const createUserController = asyncHandler( async (req: Request, res: Response) => {  
    const data = req.body;
    const result = await createUserService(data);
    res.status(201).json({data: result});
});

const updateUserController = asyncHandler( async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const data = req.body;
    const result = await updateUserService(user_id, data);
    res.status(200).json({data: result});
});

const deleteUserController = asyncHandler( async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    const result = await deleteUserService(user_id);
    res.sendStatus(204);
});

export {createUserController, getUserByIdController, getAllUserController, updateUserController, deleteUserController };