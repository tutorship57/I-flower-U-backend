import { Prisma } from "@prisma/client";

const productFlowerTypes = [
  { type_name: "Roses" },
  { type_name: "Tulips" },
  { type_name: "Daisies" },
  { type_name: "Sunflowers" },
  { type_name: "Orchids" },
  { type_name: "Lilies" },
  { type_name: "Carnations" },
  { type_name: "Chrysanthemums" },
  { type_name: "Hydrangeas" },
  { type_name: "Peonies" },
];
export const seedFlowerType = async (prisma: Prisma.TransactionClient) => await prisma.flowerType.createMany({
  data: productFlowerTypes,
  skipDuplicates: true,
});