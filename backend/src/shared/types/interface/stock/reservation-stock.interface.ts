import { Prisma } from "@prisma/client";
export interface ReservationStockInterface {
        stock_id: string,
        order_id: string,
        reserved_qty: number
        expiry_at: Date
};

export interface UpdateReservationStatusInterface {
        order_id: string,
        status: ReservationStatusEnum
}

export enum ReservationStatusEnum {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
}