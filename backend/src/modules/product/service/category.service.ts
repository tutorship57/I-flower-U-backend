import { AppError } from '../../../shared/utils/appErrorCustomize.util';
import categoryRepo from '../repository/category.repository';
const getAllCategoriesService = async () => {
    const categories = await categoryRepo.getAll();
    return categories;
}
const getCategoryService = async (category_id: number) => {
    const existingCategory = await categoryRepo.get(category_id);
    if (!existingCategory) {
        throw new AppError('Category not found', 404);
    }
    return existingCategory;
}
const createCategoryService = async (data: {category_name: string; description?: string}) => {
    const existingCategory = await categoryRepo.findName(data.category_name);
    if (existingCategory) {
        throw new AppError('Category with this name already exists', 400);
    }
    const newCategory = await categoryRepo.create(data);
    return newCategory;
}
const updateCategoryService = async (category_id: number, data: {category_name?: string}) => {
    const existingCategory = await categoryRepo.get(category_id);
    if (!existingCategory) {
        throw new AppError('Category not found', 404);
    }
    return await categoryRepo.update(category_id, data);
}
const deleteCategoryService = async (category_id: number) => {
    const existingCategory = await categoryRepo.get(category_id);
    if (!existingCategory) {
        throw new AppError('Category not found', 404);
    }
    return await categoryRepo.delete(category_id);
}

export {getAllCategoriesService, getCategoryService, createCategoryService, updateCategoryService, deleteCategoryService}
