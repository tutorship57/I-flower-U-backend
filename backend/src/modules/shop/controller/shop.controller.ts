import { Request, Response } from "express";
import { createShopService, deleteShopService, getShopByIdService, updateShopService } from "../service/shop.service";
import { createShopDataType, updateShopDataType } from "../type/shop.type";


const createShopController = async (req: Request, res: Response) => {
    const data: createShopDataType = req.body;
    const newShop = await createShopService(data);
    res.status(201).json({data: newShop});
};

const updateShopController = async (req: Request, res: Response) => {
    const shop_id = req.params.shop_id;
    const data: updateShopDataType = req.body;
    const updatedShop = await updateShopService(shop_id, data);
    res.status(200).json({data: updatedShop});
}

const getShopByIdController = async (req: Request, res: Response) => {
    const shop_id = req.params.shop_id;
    const shop = await getShopByIdService(shop_id);
    res.status(200).json({data: shop});
}

const deleteShopController = async (req: Request, res: Response) => {
    const shop_id = req.params.shop_id;
    const deletedShop = await deleteShopService(shop_id);
    res.sendStatus(204);
}

export {
    createShopController,
    updateShopController,
    getShopByIdController,
    deleteShopController,
};