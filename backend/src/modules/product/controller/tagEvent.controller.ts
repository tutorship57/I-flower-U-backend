import { getAllTagEventsService, getTagEventService, createTagEventService, updateTagEventService, deleteTagEventService } from "../service/tagEvent.service";


import { Request, Response } from "express";
import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";

const getAllTagEvents = asyncHandler( async (req: Request, res: Response) => {
    const tagEvents = await getAllTagEventsService();
    res.status(200).json({data: tagEvents});
});

const getTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const tag_id = req.params.tag_id;
    const tag_idNumber = parseInt(tag_id);
    const tagEvent = await getTagEventService(tag_idNumber);
    res.status(200).json({data: tagEvent});
});

const createTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const data = req.body;
    const newTagEvent = await createTagEventService(data);
    res.status(201).json({data: newTagEvent});    
});  

const updateTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const tag_id = req.params.tag_id;
    const data = req.body;
    const tag_idNumber = parseInt(tag_id);
    const updatedTagEvent = await updateTagEventService(tag_idNumber, data);
    res.status(200).json({data: updatedTagEvent});
});

const deleteTagEvent = asyncHandler( async (req: Request, res: Response) => {
    const tag_id = req.params.tag_id;
    const tag_idNumber = parseInt(tag_id);
    const deletedTagEvent = await deleteTagEventService(tag_idNumber);
    res.sendStatus(204)
});

export { createTagEvent, getAllTagEvents, getTagEvent, updateTagEvent, deleteTagEvent };