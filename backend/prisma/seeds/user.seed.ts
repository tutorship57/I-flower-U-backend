import { Prisma } from "@prisma/client";
import { hashPassword, verifyPassword } from './../../src/shared/utils/auth.util';
let users = [{
    user_name: "admin",
    user_email: "tutor@example.com",
    user_password: "securepassword123",
    role_id: 1
    },
    {
    user_name: "user",
    user_email: "user@example.com",
    user_password: "securepassword123",
    role_id: 2
    },
    {
    user_name: "seller",
    user_email: "seller@example.com",
    user_password: "securepassword123",
    role_id: 3
    }
]


export const seedUser = async (tx: Prisma.TransactionClient) => {

  const roles = await tx.role.findMany({})

  const userWithHashedPassword = await Promise.all(
    users.map(async (user) => ({
      ...user,
      user_password: await hashPassword(user.user_password),
    }))
  );
  console.log(userWithHashedPassword)


  return tx.user.createMany({
    data: userWithHashedPassword,
    skipDuplicates: true,
  });
};