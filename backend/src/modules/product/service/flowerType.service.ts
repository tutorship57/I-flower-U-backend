import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import flowerRepository from "../repository/flowerType.repository";

const getAllFlowerTypesService = async () => {
    const flowerTypes = await flowerRepository.getAllFlowerTypes();
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
    return newFlowerType;
}

const updateFlowerTypeService = async (type_id: number, data: {type_name?: string;}) => {
    return await flowerRepository.updateFlowerType(type_id, data);    
}

const deleteFlowerTypeService = async (type_id: number) => {
    const existingFlowerType = await flowerRepository.findFlowerTypeById(type_id);
    if (!existingFlowerType) {
        throw new AppError('Flower Type not found', 404);
    }
    const deletedFlowerType = await flowerRepository.deleteFlowerType(type_id);
    return deletedFlowerType;
}

export {getAllFlowerTypesService, getFlowerTypeService, createFlowerTypeService, updateFlowerTypeService, deleteFlowerTypeService}; 