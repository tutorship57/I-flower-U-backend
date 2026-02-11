import { seedCategories } from "./seeds/category.seed";
import { seedFlowerType } from "./seeds/flowerType.seed";
import { seedTagEvents } from "./seeds/tagEvent.seed";
import { seedRole } from "./seeds/role.seed";
import { seedColor } from "./seeds/color.seed";
import { seedUser } from "./seeds/user.seed";
import prisma from "../src/shared/prisma/prismaClient";
import { seedShops } from "./seeds/shop.seed";
import { seedProducts } from "./seeds/product.seed";
import { seedProductsImages } from "./seeds/productImage.seed";
import { seedProductTagEvent } from "./seeds/productTagEvent.seed";
import { seedProductsStock } from "./seeds/productStock.seed";

async function main() {
    await prisma.$transaction(async (tx) => {
    await seedRole(tx)
    await seedFlowerType(tx)
    await seedColor(tx)
    await seedCategories(tx)
    await seedTagEvents(tx)
    await seedUser(tx)
    await seedShops(tx)
    await seedProducts(tx)
    await seedProductsImages(tx)
    await seedProductTagEvent(tx)
    await seedProductsStock(tx)
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