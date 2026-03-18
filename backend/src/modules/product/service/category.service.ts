import { redis } from "../../../shared/redis/redis.service";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import categoryRepo from "../repository/category.repository";
import { bufferCheck } from "../../../shared/utils/cache.util";

const getAllCategoriesService = async () => {
  const categoriesCacheKey = "categories:all";
  let cacheCategories = await redis.get(categoriesCacheKey);
  if (cacheCategories) {
    cacheCategories = bufferCheck(cacheCategories);
    return JSON.parse(cacheCategories);
  }
  const categories = await categoryRepo.getAll();
  await redis.setEx(categoriesCacheKey, 300, JSON.stringify(categories));
  return categories;
};

const getCategoryService = async (category_id: number) => {
  const existingCategory = await categoryRepo.get(category_id);
  if (!existingCategory) {
    throw new AppError("Category not found", 404);
  }
  return existingCategory;
};

const createCategoryService = async (data: {
  category_name: string;
  description?: string;
}) => {
  const existingCategory = await categoryRepo.findName(data.category_name);
  if (existingCategory) {
    throw new AppError("Category with this name already exists", 400);
  }
  const newCategory = await categoryRepo.create(data);
  const categoriesCacheKey = "categories:all";
  await redis.del(categoriesCacheKey);
  return newCategory;
};

const updateCategoryService = async (
  category_id: number,
  data: { category_name?: string },
) => {
  const existingCategory = await categoryRepo.get(category_id);
  if (!existingCategory) {
    throw new AppError("Category not found", 404);
  }
  const categoriesCacheKey = "categories:all";
  await redis.del(categoriesCacheKey);

  return await categoryRepo.update(category_id, data);
};
const deleteCategoryService = async (category_id: number) => {
  const existingCategory = await categoryRepo.get(category_id);
  if (!existingCategory) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepo.delete(category_id);

  const categoriesCacheKey = "categories:all";
  await redis.del(categoriesCacheKey);

};

export {
  getAllCategoriesService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
