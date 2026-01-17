import productTagEventRepo from "../repository/productTagEvent.repository";

const getAllProductTagEventsService = async () => {
    const productTagEvents = await productTagEventRepo.getAllProductTagEvents();
    return productTagEvents;
}
const getProductTagEventsByProductIdService = async (product_id: string) => {
    const productTagEvents = await productTagEventRepo.getProductTagEventsByProductId(product_id);
    return productTagEvents;
}
const createProductTagEventService = async (data:{ tag_id: number, product_id: string }[]) => {
    const newProductTagEvent = await productTagEventRepo.createProductTagEvent(data);
    return newProductTagEvent;
}
const updateProductTagEventService = async (data:{ tag_id: number, product_id: string }[], product_id: string) => {
    const deletedProductTagEvent = await productTagEventRepo.deleteProductTagEvent(product_id);
    const newProductTagEvent =  await productTagEventRepo.createProductTagEvent(data);
    return newProductTagEvent;
}
const deleteProductTagEventService = async (tag_id: number, product_id: string) => {
    const deletedProductTagEvent = await productTagEventRepo.deleteProductTagEvent(product_id);
    return deletedProductTagEvent;
}
export { getAllProductTagEventsService, getProductTagEventsByProductIdService, createProductTagEventService, updateProductTagEventService, deleteProductTagEventService };