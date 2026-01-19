import {Request, Response} from 'express';
import { asyncHandler } from '../../../shared/middleware/asyncHandler.Middleware';
import { createManyProductService,getProductByIdsService, createProductService, deleteProductService,getAllProductByShopIDService, getAllProductService, getProductByIdService, updateProductService } from '../service/product.service';

const getProductById = asyncHandler( async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    const product = await getProductByIdService(product_id);
    res.status(200).json({data: product});
});

const getProductByIds = asyncHandler( async (req: Request, res: Response) => {
    const product_ids = req.body.product_ids as string[];
    const products = await getProductByIdsService(product_ids);
    res.status(200).json({data: products});
});

const getAllProduct = asyncHandler( async (req: Request, res: Response) => {
    const products = await getAllProductService();
    res.status(200).json({data: products});
});

const getAllProductByShopID = asyncHandler( async (req: Request, res: Response) => {
    const shop_id = req.params.shop_id;
    const products = await getAllProductByShopIDService(shop_id);
    res.status(200).json({data: products});
});

const createProduct = asyncHandler( async (req: Request, res: Response) => {
    const data = req.body;
    const files = req.files as Express.Multer.File[];
    const newProduct = await createProductService(data);
    res.status(201).json({data: newProduct});
});

const updateProduct = asyncHandler( async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    const data = req.body;
    const updatedProduct = await updateProductService(product_id, data);
    res.status(200).json({data: updatedProduct});
    // Implementation for updating a product
});// not for update images

const createManyProduct = asyncHandler( async (req: Request, res: Response) => {
    const data = req.body;
    const newProduct = await createManyProductService(data);
    res.status(201).json({data: newProduct});
});

const deleteProduct = asyncHandler( async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    const deletedProduct = await deleteProductService(product_id);
    res.sendStatus(204);
    // Implementation for deleting a product
});

export { createProduct, getProductByIds,createManyProduct, getAllProduct, getProductById, updateProduct, deleteProduct,getAllProductByShopID}; 