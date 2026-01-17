import { Request, Response } from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { createFlowerTypeService, deleteFlowerTypeService, getAllFlowerTypesService, getFlowerTypeService, updateFlowerTypeService } from '../service/flowerType.service';

const getAllFlowerTypes = asyncHandler( async (req: Request, res: Response) => {
    const flowerTypes = await getAllFlowerTypesService();
    res.status(200).json({data: flowerTypes});
});

const getFlowerType = asyncHandler( async (req: Request, res: Response) => {
    const flowerType_id = req.params.flowerType_id;
    const type_idNumber = parseInt(flowerType_id);
    const flowerType = await getFlowerTypeService(type_idNumber);
    res.status(200).json({data: flowerType});
}); 
const createFlowerType = asyncHandler( async (req: Request, res: Response) => {
    const data = req.body;
    const newFlowerType = await createFlowerTypeService(data);
    res.status(201).json({data: newFlowerType});
});

const updateFlowerType = asyncHandler( async (req: Request, res: Response) => {
    const flowerType_id = req.params.flowerType_id;
    const data = req.body;
    const type_idNumber = parseInt(flowerType_id);
    const updatedFlowerType = await updateFlowerTypeService(type_idNumber, data);
    res.status(200).json({data: updatedFlowerType});
    // Implementation for updating a flower type
});

const deleteFlowerType = asyncHandler( async (req: Request, res: Response) => {
    const flowerType_id = req.params.flowerType_id;
    const type_idNumber = parseInt(flowerType_id);
    const deletedFlowerType = await deleteFlowerTypeService(type_idNumber);
    res.sendStatus(204);
    // Implementation for deleting a flower type
});

export { createFlowerType, getAllFlowerTypes, getFlowerType, updateFlowerType, deleteFlowerType };