import { Request, Response } from "express";
import  { getAllProductColorsService, getProductColorsByProductIdService, getProductColorByIdService, createProductColorService, deleteProductColorService } from "../service/productColor.service";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";

const getAllProductColorsByProductId = asyncHandler(async (req: Request, res: Response) => {
    const productColors = await getProductColorsByProductIdService(req.params.product_id);
    return res.status(200).json({data: productColors});
});


const getProductColorById = asyncHandler(async (req: Request, res: Response) => {
    const color_id = Number(req.params.color_id);
    const productColor = await getProductColorByIdService(color_id);
    return res.status(200).json({data: productColor});
});

const createProductColor = asyncHandler(async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    const data = req.body;
    const newProductColor = await createProductColorService(product_id, data);
    return res.status(201).json({data: newProductColor});
});

const deleteProductColor = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const deletedProductColor = await deleteProductColorService(data);
    return res.sendStatus(204);
});

export { getAllProductColorsByProductId, getProductColorById, createProductColor, deleteProductColor };