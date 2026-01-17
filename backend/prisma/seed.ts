import { seedCategories } from "./seeds/category.seed";
import { seedFlowerType } from "./seeds/flowerType.seed";
import { seedTagEvents } from "./seeds/tagEvent.seed";
import { seedRole } from "./seeds/role.seed";
import { seedColor } from "./seeds/color.seed";
import prisma from "../src/shared/prisma/prismaClient";

async function main() {
    await prisma.$transaction(async (tx) => {
    await seedRole(tx)
    await seedFlowerType(tx)
    await seedColor(tx)
    await seedCategories(tx)
    await seedTagEvents(tx)
    });
  console.log({
    message: "Database seeded successfully",
  })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });