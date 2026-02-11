import { Prisma } from "@prisma/client";
import prisma from "../../src/shared/prisma/prismaClient"


export const seedProductTagEvent = async (tx: Prisma.TransactionClient) => {

const product = await tx.product.findMany({});
// console.log("this is ",product)

const productTagEvent = [{
    product_id: product[0].product_id,
    tag_id: 1,
},
{
    product_id: product[1].product_id,
    tag_id: 2,
},
{
    product_id: product[2].product_id,
    tag_id: 3,
},
{
    product_id: product[3].product_id,
    tag_id: 4,
},
{
    product_id: product[4].product_id,
    tag_id: 5,
},
]

    await tx.productTagEvent.createMany({
        data: productTagEvent,
    });
}