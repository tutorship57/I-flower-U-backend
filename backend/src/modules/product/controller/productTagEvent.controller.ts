import { getAllProductTagEventsService, getProductTagEventsByProductIdService, createProductTagEventService, updateProductTagEventService, deleteProductTagEventService } from "../service/productTagEvent.service";
import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";

const getAllProductTagEvents = asyncHandler( async (req: Request, res: Response) => {
    const productTagEvents = await getAllProductTagEventsService();
    res.status(200).json({data: productTagEvents});
});

const getProductTagEventsByProductId = asyncHandler( async (req: Request, res: Response) => {
    const product_id = req.params.product_id;
    const productTagEvents = await getProductTagEventsByProductIdService(product_id);
    res.status(200).json({data: productTagEvents});
});

const createProductTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const { tag_id, product_id } = req.body;
    const newProductTagEvent = await createProductTagEventService(tag_id, product_id);
    res.status(201).json({data: newProductTagEvent});
});

const updateProductTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const { tag_id, product_id, newTagId } = req.body;
    const updatedProductTagEvent = await updateProductTagEventService(tag_id, product_id, newTagId);
    res.status(200).json({data: updatedProductTagEvent});
});

const deleteProductTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const { tag_id, product_id } = req.body;
    const deletedProductTagEvent = await deleteProductTagEventService(tag_id, product_id);
    res.sendStatus(204);
});

export { createProductTagEvent, getAllProductTagEvents, getProductTagEventsByProductId, updateProductTagEvent, deleteProductTagEvent };