import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { getCategoryService, getAllCategoriesService, createCategoryService, updateCategoryService, deleteCategoryService } from "../service/category.service";

const getCategory = asyncHandler( async (req: Request, res: Response ) => {
    const { categoryId } = req.params;
    const category = await getCategoryService(Number(categoryId));
    return res.status(200).json({ data: category });
});

const getAllCategory = asyncHandler( async (req: Request, res: Response ) => {
    const categories = await getAllCategoriesService();
    return res.status(200).json({ data: categories });
})  ;

const createCategory = asyncHandler( async (req: Request, res: Response ) => {
    const { name, description } = req.body;
    const newCategory = await createCategoryService({category_name: name, description});
    return res.status(201).json({ data: newCategory });
});

const updateCategory = asyncHandler( async (req: Request, res: Response ) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updatedCategory = await updateCategoryService(Number(categoryId), {category_name: name});
    return res.status(200).json({ data: updatedCategory });
});

const deleteCategory = asyncHandler( async (req: Request, res: Response ) => {
    const { categoryId } = req.params;
    const deletedCategory = await deleteCategoryService(Number(categoryId));
    return res.status(200).json({ data: deletedCategory });
});


export { getCategory, getAllCategory, createCategory, updateCategory, deleteCategory };