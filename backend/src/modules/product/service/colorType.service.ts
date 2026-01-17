import colorTypeRepository from "../repository/colorType.repository";
import { AppError } from '../../../shared/utils/appErrorCustomize.util';

const getAllColorTypesService = async () => {
    const existingColorTypes = await colorTypeRepository.getAllColorTypes();
    return existingColorTypes;
}

const getColorTypeService = async (color_id: number) => {
    const existingColorType = await colorTypeRepository.findColorTypeById(color_id);
    if (!existingColorType) {
        throw new AppError('Color Type not found', 404);
    }
    return existingColorType;
}

const createColorTypeService = async (data: {color_name: string;}) => {
    const existingColorType = await colorTypeRepository.findColorTypeByName(data.color_name);            
    if (existingColorType) {
        throw new AppError('Color Type with this name already exists', 400);
    }
    return await colorTypeRepository.createColorType(data);
}

const updateColorTypeService = async (color_id: number, data: {color_name?: string;}) => {
    return await colorTypeRepository.updateColorType(color_id, data);    
}

const deleteColorTypeService = async (color_id: number) => {
    const existingColorType = await colorTypeRepository.findColorTypeById(color_id);
    if (!existingColorType) {
        throw new AppError('Color Type not found', 404);
    }
    return await colorTypeRepository.deleteColorType(color_id);
}

export {getAllColorTypesService, getColorTypeService, createColorTypeService, updateColorTypeService, deleteColorTypeService};