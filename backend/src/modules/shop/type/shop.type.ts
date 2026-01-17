export type createShopDataType = {
    shop_name: string; 
    shop_address:string;
    shop_phone:string;
    shop_open:number;
    shop_close:number;
    user_id:string;
}   
export type updateShopDataType = Partial<createShopDataType>;

export type shopRepositoryType = {
    getShopById: (shop_id: string) => Promise<any>;
    createShop: (data: createShopDataType) => Promise<any>;
    updateShop: (shop_id: string, data: updateShopDataType) => Promise<any>;
    deleteShop: (shop_id: string) => Promise<any>;
};