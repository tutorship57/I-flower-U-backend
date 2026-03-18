import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import flowerRepository from "../repository/flowerType.repository";
import { redis } from "../../../shared/redis/redis.service";
import { bufferCheck } from '../../../shared/utils/cache.util';

const getAllFlowerTypesService = async () => {
    const cacheKey = "flowerTypes:all";
    const cacheFlowerTypes = await redis.get(cacheKey);
    if (cacheFlowerTypes) {
        const parsedCache = bufferCheck(cacheFlowerTypes);
        return JSON.parse(parsedCache);
    }
    const flowerTypes = await flowerRepository.getAllFlowerTypes();
    await redis.setEx(cacheKey, 300, JSON.stringify(flowerTypes));
    return flowerTypes;
}

const getFlowerTypeService = async (type_id: number) => {
    const existingFlowerType = await flowerRepository.findFlowerTypeById(type_id);
    if (!existingFlowerType) {
        throw new AppError('Flower Type not found', 404);
    }
    return existingFlowerType;
}

const createFlowerTypeService = async (data: {type_name: string;}) => {
    const existingFlowerType = await flowerRepository.findFlowerTypeByName(data.type_name);            
    if (existingFlowerType) {
        throw new AppError('Flower Type with this name already exists', 400);
    }
    const newFlowerType = await flowerRepository.createFlowerType(data);
    const cacheKey = "flowerTypes:all";
    await redis.del(cacheKey);
    return newFlowerType;
}

const updateFlowerTypeService = async (type_id: number, data: {type_name?: string;}) => {
    const existingFlowerType = await flowerRepository.findFlowerTypeById(type_id);
    if (!existingFlowerType) {
        throw new AppError('Flower Type not found', 404);
    }
    const updatedFlowerType = await flowerRepository.updateFlowerType(type_id, data);
    const cacheKey = "flowerTypes:all";
    await redis.del(cacheKey);
    return updatedFlowerType;
}

const deleteFlowerTypeService = async (type_id: number) => {
    const existingFlowerType = await flowerRepository.findFlowerTypeById(type_id);
    if (!existingFlowerType) {
        throw new AppError('Flower Type not found', 404);
    }
    const cacheKey = "flowerTypes:all";
    await redis.del(cacheKey);
    await flowerRepository.deleteFlowerType(type_id);
}

export {getAllFlowerTypesService, getFlowerTypeService, createFlowerTypeService, updateFlowerTypeService, deleteFlowerTypeService}; 