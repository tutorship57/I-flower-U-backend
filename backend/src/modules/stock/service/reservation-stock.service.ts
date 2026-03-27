import { Prisma } from "@prisma/client";
import reservationRepository from "../repository/reservation.repository";
import {
  ReservationStatusEnum,
  ReservationStockFilters,
  ReservationStockInterface,
} from "../../../shared/types/interface/stock/reservation-stock.interface";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";

const getReservationStockByOrderIdService = async (order_id: string) => {
  const reservationStocks =
    await reservationRepository.getReservationStockByOrderId(order_id);
  return reservationStocks;
};

const getReservationStocksFilterService = async (where: ReservationStockFilters,stock_id:string) => {
  const { reserved_status, order_id,...others} = where;
  if(Object.keys(others).length>0){
    throw new AppError('Bad Request !',400)
  }
  let filters:ReservationStockFilters ={stock_id};
  if (reserved_status !== undefined) filters.reserved_status = reserved_status;
  if (order_id !== undefined) filters.order_id = order_id;
  const reservationStocks = await reservationRepository.getAllReservationStockFilters(filters)
  return reservationStocks
};

const createReservationStocksService = async (
  tx: Prisma.TransactionClient,
  reservations: ReservationStockInterface[],
) => {
  return await reservationRepository.createReservations(tx, reservations);
};

const updateReservationStocksService = async (
  tx: Prisma.TransactionClient,
  order_id: string,
  status: ReservationStatusEnum,
) => {
  return await reservationRepository.updateStatusReservation(tx, {
    order_id,
    status,
  });
};

export {
  updateReservationStocksService,
  getReservationStockByOrderIdService,
  createReservationStocksService,
  getReservationStocksFilterService,
};
