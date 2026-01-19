import productTagEventRepo from "../repository/productTagEvent.repository";

const getAllProductTagEventsService = async () => {
    const productTagEvents = await productTagEventRepo.getAllProductTagEvents();
    return productTagEvents;
}
const getProductTagEventsByProductIdService = async (product_id: string) => {
    const productTagEvents = await productTagEventRepo.getProductTagEventsByProductId(product_id);
    return productTagEvents;
}
const createProductTagEventService = async (product_id: string, data:{ tag_id: number }[]) => {
    const tags_data = data.map((item) => {
        return {
            product_id: product_id,
            tag_id: item.tag_id ,
        };
    });
    const newProductTagEvent = await productTagEventRepo.createProductTagEvent(tags_data);
    return newProductTagEvent;
}
const updateProductTagEventService = async ( product_id: string, data:{ tag_id: number }[]) => {
    const tags_data = data.map((item) => {
        return {
            product_id: product_id,
            tag_id: item.tag_id ,
        };
    })
    const deletedProductTagEvent = await productTagEventRepo.deleteProductTagEvent(product_id);
    const newProductTagEvent =  await productTagEventRepo.createProductTagEvent(tags_data);
    return newProductTagEvent;
}
const deleteProductTagEventService = async (tag_id: number, product_id: string) => {
    const deletedProductTagEvent = await productTagEventRepo.deleteProductTagEvent(product_id);
    return deletedProductTagEvent;
}
export { getAllProductTagEventsService, getProductTagEventsByProductIdService, createProductTagEventService, updateProductTagEventService, deleteProductTagEventService };