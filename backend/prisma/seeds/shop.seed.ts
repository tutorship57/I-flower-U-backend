import  prisma from '../../src/shared/prisma/prismaClient';
import { Prisma} from "@prisma/client";
const userShopMock = async () => {
    const user = await prisma.user.findFirst({
        where: { user_email: "seller@example.com"}
    });
    return user?.user_id;
}

const shop = [
    {
        user_id: await userShopMock() || " ",
        shop_name:"Blooming Raven",
        shop_address:"123 Flower St, Floral City",
        shop_phone:"555-1234-5678",
        shop_open:540,
        shop_close:1020,
    }
]

export const seedShops = async (prisma: Prisma.TransactionClient) => {
    await prisma.shop.createMany({
    data: shop,
    skipDuplicates: true,
});
}