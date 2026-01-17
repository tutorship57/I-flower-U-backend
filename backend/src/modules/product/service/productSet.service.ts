import productSetRepository from "../repository/productSet.repository";
const createProductSetService = async (data:{set_id: string; item_id: string; quantity: number;}[]) => {
    return await productSetRepository.createProductSet(data);
} 
// const updateProductSetService = async (set_id: string, item_id: string, data: {quantity?: number;}) => {
//     return await productSetRepository.updateProductSet(set_id, item_id, data);
//     // No update function in repository, implement if needed
// }
const findItemsBySetIdService = async (set_id: string) => {
    return await productSetRepository.findItemsBySetId(set_id);
} 
const findManyItemBySetIdsService = async (set_ids: string[]) => {
    return await productSetRepository.findManyItemsBySetIds(set_ids);
}


const deleteProductSetService = async (set_id: string, item_id: string) => {
    return await productSetRepository.deleteProductSet(set_id, item_id);
} 


export {createProductSetService,findManyItemBySetIdsService, findItemsBySetIdService, deleteProductSetService};   