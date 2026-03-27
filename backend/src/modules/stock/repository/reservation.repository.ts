import { Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma/prismaClient";
import { ReservationStatusEnum, ReservationStockFilters, ReservationStockInterface, UpdateReservationStatusInterface } from "../../../shared/types/interface/stock/reservation-stock.interface";
const reservationRepository = {
    getAllReservationStockFilters: async(where:ReservationStockFilters)=>{
        return await prisma.reservationStock.findMany({
            where,
        })
    },
    getReservationById:async(reservation_id:string)=>{
        return await prisma.reservationStock.findUnique({
            where:{reservation_id}
        })
    },
    getReservationStockByOrderId: async (order_id: string) => {
        return await prisma.reservationStock.findMany({
            where: { order_id },
        });
    },
    createReservations: async (tx: Prisma.TransactionClient, reservations: ReservationStockInterface[]) => {
        return await tx.reservationStock.createMany({
            data: reservations
        });
    }
    ,
    updateStatusReservation: async (tx: Prisma.TransactionClient,{order_id, status }: UpdateReservationStatusInterface) => {
        return await tx.reservationStock.updateMany({
            where: { order_id },
            data: {
                reserved_status: status,
            }
        });
    },
}

export default reservationRepository