import { Prisma } from "@prisma/client";
import reservationRepository from "../repository/reservation.repository";
import { ReservationStatusEnum, ReservationStockInterface } from "../../../shared/types/interface/stock/reservation-stock.interface";

const getReservationStockByOrderIdService = async (order_id: string) => {
    const reservationStocks = await reservationRepository.getReservationStockByOrderId(order_id);
    return reservationStocks;
}

const createReservationStocksService = async (tx: Prisma.TransactionClient, reservations:ReservationStockInterface[]) => {
    return await reservationRepository.createReservations(tx, reservations);
}   

const updateReservationStocksService = async (tx: Prisma.TransactionClient,order_id: string,status:ReservationStatusEnum) => {
    return await reservationRepository.updateStatusReservation(tx,{order_id,status});
}



export { updateReservationStocksService,getReservationStockByOrderIdService, createReservationStocksService};