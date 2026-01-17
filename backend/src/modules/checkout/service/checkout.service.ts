import { createOrderService } from "../../order/service/order.service";
import { getCartItemsByCartIdService } from "../../cart/service/cartItem.service";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { validateCartAndSplitItem } from "../helper/checkout.helper";
import { reserveStockQueue } from "../../../shared/bullMQ/stock/stock.queue";
import { createManyOrderItemService } from "../../order/service/orderItem.service";
import checkoutRepository from "../repository/checkout.repository";
const checkoutService = async (data: {
  user_id: string;
  total_amount: number;
  items: Array<{ product_id: string; quantity: number; unit_price: number }>;
  cart_id: string;
}) => {
  const { user_id, total_amount, items, cart_id } = data;

  const cartItems = await getCartItemsByCartIdService(cart_id);

  const { cartItemSet, cartItemSingle, calculatedTotalAmount } = validateCartAndSplitItem(items, cartItems);

  if (calculatedTotalAmount !== total_amount) {
    throw new AppError(
      `Total amount mismatch: expected ${calculatedTotalAmount}, got ${total_amount}`,
      400
    );
  }

  const order = await createOrderService({
    user_id,
    total_amount,
  });

  const orderItemsData = items.map((item) => ({
    order_id: order.order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));
  
  const orderItems = await createManyOrderItemService(orderItemsData);

  // check redis stock for each item
  await reserveStockQueue.add(
    "reserve-stock",
    {
      cart_id: cart_id,
      order_id: order.order_id,
      total_amount: calculatedTotalAmount,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: 20,
      removeOnFail: 20,
    }
  );
  return order.order_id;
};



const getCartNormalizedService = async (cart_id: string) => {
  const cartItems = await checkoutRepository.getCartAggregatedItems(cart_id);
  return cartItems;
};
const getOrderNormalizedService = async (order_id: string)=>{
  const orderItems = await checkoutRepository.getOrderAggregatedItems(order_id);
  return orderItems;
}
export { checkoutService, getCartNormalizedService, getOrderNormalizedService };
