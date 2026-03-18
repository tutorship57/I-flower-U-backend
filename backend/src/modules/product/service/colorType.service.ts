import colorTypeRepository from "../repository/colorType.repository";
import { AppError } from '../../../shared/utils/appErrorCustomize.util';
import { redis } from "../../../shared/redis/redis.service";
import { bufferCheck } from "../../../shared/utils/cache.util";
const getAllColorTypesService = async () => {
    const cacheKey = "colorTypes:all";
    let cacheColorTypes = await redis.get(cacheKey);
    if (cacheColorTypes) {
        cacheColorTypes = bufferCheck(cacheColorTypes);
        return JSON.parse(cacheColorTypes);
    }
    const existingColorTypes = await colorTypeRepository.getAllColorTypes();
    await redis.setEx(cacheKey, 300, JSON.stringify(existingColorTypes));
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
    const newColorType = await colorTypeRepository.createColorType(data);
    const cacheKey = "colorTypes:all";
    await redis.del(cacheKey);
    return newColorType;
}

const updateColorTypeService = async (color_id: number, data: {color_name?: string;}) => {
    const updatedColorType = await colorTypeRepository.updateColorType(color_id, data);
    const cacheKey = "colorTypes:all";
    await redis.del(cacheKey);
    return updatedColorType;
}

const deleteColorTypeService = async (color_id: number) => {
    const existingColorType = await colorTypeRepository.findColorTypeById(color_id);
    if (!existingColorType) {
        throw new AppError('Color Type not found', 404);
    }  
    const cacheKey = "colorTypes:all";
    await redis.del(cacheKey);
    await colorTypeRepository.deleteColorType(color_id);
}

export {getAllColorTypesService, getColorTypeService, createColorTypeService, updateColorTypeService, deleteColorTypeService};