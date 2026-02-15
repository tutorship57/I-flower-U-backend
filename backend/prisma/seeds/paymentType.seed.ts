import { Prisma } from '@prisma/client';
import  prisma from '../../src/shared/prisma/prismaClient';

const payTypeData = {
    paytype_name:"credit-card"
}
export const seedPaymentType = async (tx: Prisma.TransactionClient) => await tx.payType.create({
    data: payTypeData
})