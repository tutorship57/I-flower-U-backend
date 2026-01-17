import {getAllProductImagesService, getProductImageService, createProductImagesService, getImagesByProductIdService, updateProductImageService, deleteProductImageService} from "../service/productImage.service";
import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { createMockImagesService } from "../service/productImage.service";
const getAllProductImages = asyncHandler( async (req: Request, res: Response ) => {
    const images = await getAllProductImagesService();
    const message = images.length ? 'Product images fetched successfully' : 'No product images found';
    return res.status(200).json({ message, images });
});

const getProductImage = asyncHandler( async (req: Request, res: Response ) => {
    const { image_id } = req.params;
    const image = await getProductImageService(image_id);
    const message = image ? 'Product image fetched successfully' : 'Product image not found';
    return res.status(200).json({ message, image });
});

const createMultipleProductImage = asyncHandler( async (req: Request, res: Response ) => {
    const { product_id } = req.params;
    const files = req.files;
    if (!files || files.length === 0) {
        throw new AppError("No files uploaded", 400);
    }
    const product_files = files as Express.Multer.File[];
    const newImages = await createProductImagesService(product_id, product_files);
    return res.status(201).json({ data: newImages });
});
const createMocksProductImage = asyncHandler( async (req: Request, res: Response ) => {
    const data = req.body;
    if (!data || data.length === 0) {
        throw new AppError("No data provided", 400);
    }
    const newImages = await createMockImagesService(data);
    return res.status(201).json({ data: newImages });
});

const getImagesByProductId = asyncHandler( async (req: Request, res: Response ) => {
    const { product_id } = req.params;
    const images = await getImagesByProductIdService(product_id);
    return res.status(200).json({ data: images });
});

const updateProductImage = asyncHandler( async (req: Request, res: Response ) => {
    const { image_id } = req.params;
    const data = req.body;
    const updatedImage = await updateProductImageService(image_id, data);
    return res.status(200).json({ data: updatedImage });
});

const deleteProductImage = asyncHandler( async (req: Request, res: Response ) => {
    const { image_id } = req.params;
    const deletedImage = await deleteProductImageService(image_id);
    return res.sendStatus(204);
});

export { getAllProductImages,createMocksProductImage ,getProductImage, createMultipleProductImage, getImagesByProductId, updateProductImage, deleteProductImage };