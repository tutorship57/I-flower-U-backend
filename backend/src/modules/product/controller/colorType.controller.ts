import { Request, Response } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { createColorTypeService, deleteColorTypeService, getAllColorTypesService, getColorTypeService, updateColorTypeService } from '../service/colorType.service';

const getAllColorTypes = asyncHandler( async (req: Request, res: Response) => {
    const colorTypes = await getAllColorTypesService();
    res.status(200).json({data: colorTypes});
});

const getColorType = asyncHandler( async (req: Request, res: Response) => {
    const colorType_id = req.params.colorType_id;
    const type_idNumber = parseInt(colorType_id);
    const colorType = await getColorTypeService(type_idNumber);
    res.status(200).json({data: colorType});
}); 

const createColorType = asyncHandler( async (req: Request, res: Response) => {
    const data = req.body;
    const newColorType = await createColorTypeService(data);
    res.status(201).json({data: newColorType});    
});  

const updateColorType = asyncHandler( async (req: Request, res: Response) => {
    const colorType_id = req.params.colorType_id;
    const data = req.body;
    const type_idNumber = parseInt(colorType_id);
    const updatedColorType = await updateColorTypeService(type_idNumber, data);
    res.status(200).json({data: updatedColorType});
});

const deleteColorType = asyncHandler( async (req: Request, res: Response) => {
    const colorType_id = req.params.colorType_id;
    const type_idNumber = parseInt(colorType_id);
    const deletedColorType = await deleteColorTypeService(type_idNumber);
    res.sendStatus(204)
});

export { createColorType, getAllColorTypes, getColorType, updateColorType, deleteColorType };