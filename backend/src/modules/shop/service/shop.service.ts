import shopRepository from "../repository/shop.repository";
import { createShopDataType,updateShopDataType } from "../type/shop.type";
const createShopService = async (data: createShopDataType) => {
    return await shopRepository.createShop(data);
}

const updateShopService = async (shop_id: string, data: updateShopDataType) => {
    return await shopRepository.updateShop(shop_id, data);
}

const getShopByIdService = async (shop_id: string) => {
    return await shopRepository.getShopById(shop_id);
}

const deleteShopService = async (shop_id: string) => {
    return await shopRepository.deleteShop(shop_id);
}

export {
    createShopService ,
    updateShopService,
    getShopByIdService,
    deleteShopService,
};
