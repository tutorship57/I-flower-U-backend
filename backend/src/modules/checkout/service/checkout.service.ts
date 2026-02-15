import prisma from "../../../shared/prisma/prismaClient";
import { Prisma } from "@prisma/client";
import { createOrderService,} from "../../order/service/order.service";
import { getCartItemsByCartIdService } from "../../cart/service/cartItem.service";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import { createManyOrderItemService } from "../../order/service/orderItem.service";
import { stripePaymentQueue } from "../../../shared/bullMQ/payment/payment.queue";
import { addMinutesToDate } from "../../../shared/utils/converse-time.util";
import { getAllProductsStockServiceByProductId, updateReservationsQueryRawService } from "../../stock/service/product-stock.service";
import { createReservationStocksService} from "../../stock/service/reservation-stock.service";
import { ReservationStockInterface } from "../../../shared/types/interface/stock/reservation-stock.interface";
import { getAggregateCartItemsByCartIdService } from "../../cart/service/cartItem.service";

const checkoutService = async (data: {
  user_id: string;
  // total_amount: number;
  // items: Array<{ product_id: string; quantity: number; unit_price: number }>;
  cart_id: string;

}) => {

  const { user_id,  cart_id } = data;
  const cartItems = await getCartItemsByCartIdService(cart_id);
  // const { calculatedTotalAmount } = validateCartAndSplitItem(items, cartItems);
  const totalAmount = await  getAggregateCartItemsByCartIdService(cart_id);

  // if (calculatedTotalAmount !== total_amount) {
  //   throw new AppError(
  //     `Total amount mismatch: expected ${calculatedTotalAmount}, got ${total_amount}`,
  //     400
  //   );
  // }


  const reservationExpiryMinutes = 15; 
  const reservationExpiryDate = addMinutesToDate(new Date(), reservationExpiryMinutes);
  
  // create stock transaction
  const order = await prisma.$transaction(
    async (tx) => {
      // load stock with transaction
      const itemMap_ids = new Map(cartItems.map(i => [i.product_id, i]));
      const product_ids = cartItems.map((item) => item.product_id);
      

      // create order 
      const orderData = {user_id, total_amount: totalAmount};
      const order = await createOrderService(tx,orderData);
      // create order items 
      const createManyOrderItemPayload = cartItems.map((item) => ({
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
      }))
      await createManyOrderItemService(
        tx,
        createManyOrderItemPayload
      );

      let reservationStocksData: ReservationStockInterface[] = [];
      let updateReservation: Prisma.Sql[] = [];
      const stockList = await getAllProductsStockServiceByProductId(tx,product_ids);
      // reserve stock and create reservation records
      for (const stock of stockList) {
        const item = itemMap_ids.get(stock.product_id);
        const reservationStockData ={
          stock_id: stock.stock_id,
          order_id: order.order_id,
          reserved_qty: item.quantity,
          expiry_at: reservationExpiryDate,    
        };
        updateReservation.push(Prisma.sql`(${stock.stock_id}, ${item.quantity})`);
        reservationStocksData.push(reservationStockData);
      //   await updateReservedProductStockService(tx,stock.stock_id,item.quantity); // cant optimize cause cant update reserved qty  in difference
      }
      let updateReservationData = updateReservation.join(",");

      const updatedCount =await updateReservationsQueryRawService(tx,updateReservation);
      await createReservationStocksService(tx,reservationStocksData);
      if (updatedCount !== stockList.length){
        throw new AppError('Insufficient stock to reserve items', 400);
      }
      return order;
  }
  );


  // check redis stock for each item
  await stripePaymentQueue.add(
    "stripe-payment",
    {
      order_id: order.order_id,
      total_amount: totalAmount,
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
  return order;
};




export { checkoutService };
