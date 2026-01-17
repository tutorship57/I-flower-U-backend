import { findManyItemBySetIdsService } from "../../modules/product/service/productSet.service";
const normalizeStockItems = async (cartItemSet: any[], cartItemSingle: any[]) => {
    const normalizedItems: any[] = [];
    const itemMap: { [key: string]: number } = {};
    const setIds = cartItemSet.map(item => item.product_id);
    const setItems =await findManyItemBySetIdsService(setIds);
    // Process set items

    for (const item of setItems) {
        if (itemMap[item.item_id]) {
            itemMap[item.item_id] += item.quantity;
        }            
        else {
            itemMap[item.item_id] = item.quantity;
        }
    }   

    for (const productId in cartItemSingle) {
        if(itemMap[productId]) {
            itemMap[productId] += cartItemSingle[productId];
        } else {
            itemMap[productId] = cartItemSingle[productId].quantity;
        }
    }      

    for (const productId in itemMap) {
        normalizedItems.push({
            product_id: productId,
            quantity: itemMap[productId],
        });
    }      

    return normalizedItems;
}

export default normalizeStockItems;