import { Prisma } from '@prisma/client';
import  prisma from '../../src/shared/prisma/prismaClient';


export const seedProducts = async (prisma:Prisma.TransactionClient) => {
  const shop = await prisma.shop.findFirst({
  where: { shop_name: "Blooming Raven" }
})
  
const products = [
    {
      shop_id: shop?.shop_id || " ",
      product_name: 'Rose Bouquet Deluxe',
      product_description: 'Premium red roses arrangement',
      product_price: 89.99,
      category_id: 1,
      type_id: 1
    },
    {
      shop_id: shop?.shop_id || " ",
      product_name: 'Spring Tulip Set',
      product_description: 'Colorful tulip collection',
      product_price: 49.99,
      category_id: 2,
      type_id:2
    },
    {
      shop_id: shop?.shop_id || " ",
      product_name: 'Carnation Love',
      product_description: 'Set of three colorful tulip bouquets',
      product_price: 59.99,
      category_id: 1,
      type_id:3
    },
    {
      shop_id: shop?.shop_id || " ",
      product_name: 'Ceramic Vase Pink',
      product_description: 'Elegant ceramic vase',
      product_price: 32.00,
      category_id: 1,
      type_id:4
    },
    {
      shop_id: shop?.shop_id || " ",
      product_name: 'Sunflower Smile',
      product_description: 'Bright sunflower arrangement',
      product_price: 52.00,
      category_id: 1,
      type_id:5
    },
]

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  const product = await prisma.product.findMany({});
  // console.log("Products seeded successfully",product);
}
