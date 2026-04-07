import { Prisma, reserved_status } from '@prisma/client';
export const seedProductsStock = async (prisma:Prisma.TransactionClient) => {

    const product = await prisma.product.findMany({
    })

    const productStockData = product.map((product) => {
        return {
            product_id: product.product_id,
            stock_qty: 100,
        };
    });

    await prisma.productStock.createMany({
        data: productStockData,
        skipDuplicates: true,
    });
}
