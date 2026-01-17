import { Prisma } from "@prisma/client";

const Colors = [
    { color_name: "Red" },
    { color_name: "Yellow" },
    { color_name: "Blue" },
    { color_name: "Green" },
    { color_name: "Orange" },
    { color_name: "Purple" },
    { color_name: "Pink" },
    { color_name: "Black" },
    { color_name: "White" },
    { color_name: "Brown" },
];

export const seedColor = async (prisma: Prisma.TransactionClient) => await prisma.colorType.createMany({
    data: Colors,
    skipDuplicates: true,
});