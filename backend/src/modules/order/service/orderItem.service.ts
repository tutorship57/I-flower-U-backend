import orderItemRepository from "../repository/orderItem.repository";

const getOrderItemByIdService = async (item_id: string) => {
    const orderItem = await orderItemRepository.getOrderItemById(item_id);
    return orderItem;
}

const getOrderItemsByOrderIdService = async (order_id: string) => {
    const orderItems = await orderItemRepository.getOrderItemsByOrderId(order_id);
    return orderItems;
}

const createOrderItemService = async (data: {order_id: string; product_id: string; quantity: number; unit_price: number;}) => {
    const newOrderItem = await orderItemRepository.createOrderItem(data);
    return newOrderItem;
}
const createManyOrderItemService = async (data: {order_id: string; product_id: string; quantity: number; unit_price: number;}[]) => {
    const newOrderItems = await orderItemRepository.createOrderItems(data);
    return newOrderItems;
}

const updateOrderItemService = async (item_id: string, data: Partial<{quantity: number; unit_price: number;}>) => {
    const updatedOrderItem = await orderItemRepository.updateOrderItem(item_id, data);
    return updatedOrderItem;
}        

const deleteOrderItemService = async (item_id: string) => {
    return await orderItemRepository.deleteOrderItem(item_id);
}   

export { getOrderItemByIdService, getOrderItemsByOrderIdService, createOrderItemService, updateOrderItemService, deleteOrderItemService, createManyOrderItemService };