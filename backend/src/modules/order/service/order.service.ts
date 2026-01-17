import orderRepository from "../repository/order.repository";
import { OrderStatusEnum } from "../../../shared/types/enum/order/orderStatus";
const createOrderService = async (data: { user_id: string; total_amount: number;order_status?: OrderStatusEnum}) => {
    const newOrder = await orderRepository.createOrder(data);
    return newOrder;
}       

const getOrderByIdService = async (order_id: string) => {
    const order = await orderRepository.getOrderById(order_id); 
    if(!order){
        throw new Error("Order not found");
    }
    return order;
}
const getAllOrdersService = async () => {
    const orders = await orderRepository.getAllOrders(); 
    return orders;
}

const updateOrderStatusService = async (order_id: string, order_status: OrderStatusEnum) => {
    const updatedOrder = await orderRepository.updateOrderStatus(order_id, order_status);
    if(!updatedOrder){
        throw new Error("Order not found");
    }
    return updatedOrder;
}

const deleteOrderService = async (order_id: string) => {
    const order = await orderRepository.getOrderById(order_id);
    if(!order){
        throw new Error("Order not found");
    }
    const deletedOrder = await orderRepository.deleteOrder(order_id);
    return deletedOrder;
}

export { createOrderService, getAllOrdersService, getOrderByIdService, updateOrderStatusService, deleteOrderService};