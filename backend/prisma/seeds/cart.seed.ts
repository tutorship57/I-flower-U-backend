import { Prisma } from "@prisma/client";
import prisma from "../../src/shared/prisma/prismaClient";


export const seedCart = async (tx: Prisma.TransactionClient) => {

  const users = await tx.user.findMany({
    select: {
      user_id: true, // สมมติ field ชื่อ id
    },
  });

  const cartData = users.map((user) => ({
    user_id: user.user_id,
  }));
  
  return tx.cart.createMany({
    data: cartData
  });
};