import { Prisma } from "@prisma/client";

const roleMockUp = [
  {
    role_name: "USER",
  },
  {
    role_name: "SELLER",
  },
  {
    role_name: "ADMIN",
  },
];

export const seedRole = async (prisma: Prisma.TransactionClient) => {
    await prisma.role.createMany({
    data: roleMockUp,
    skipDuplicates: true,
    });
}
