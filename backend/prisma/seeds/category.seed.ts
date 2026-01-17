import { Prisma} from "@prisma/client";

const category = [
    {
        category_name: "Single"
    },
    {
        category_name: "Set"
    },
];

export const seedCategories = async (prisma: Prisma.TransactionClient) => {
    await prisma.category.createMany({
    data: category,
    skipDuplicates: true,
});
}