import prisma from "../../../shared/prisma/prismaClient";

interface Product {
  product_name: string;
  product_description?: string;
  category_id: number;
  product_price: number;
  shop_id: string;
}

const productRepository = {
  getAllProduct: async () => {
    return await prisma.product.findMany({
      select: {
        product_id: true,
        product_name: true,
        product_price: true,
        product_description: true,
        category: {
          select: {
            category_name: true,
          },
        },
        productColor: {
          include: {
            color: true,
          },
        },
        productImage: {
          select: {
            image_url: true,
          },
        },
        productTagEvent: {
          include: {
            TagEvent: {
              select: {
                tag_id: true,
                tag_event_name: true,
              },
            },
          },
        },
        productStocks:{
          select: {
            stock_id:true,
            stock_qty:true,
            reserved_qty:true,
          }
        }
      },
    });
  },
  findProductById: async (product_id: string) => {
    return await prisma.product.findUnique({
      where: { product_id },
      select: {
        product_id: true,
        product_name: true,
        product_price: true,
        product_description: true,
        category: {
          select: {
            category_name: true,
          },
        },
        productColor: {
          include: {
            color: true,
          },
        },
        productImage: {
          select: {
            image_url: true,
          },
        },
        productTagEvent: {
          include: {
            TagEvent: {
              select: {
                tag_id: true,
                tag_event_name: true,
              },
            },
          },
        },
        productStocks:{
          select: {
            stock_id:true,
            stock_qty:true,
            reserved_qty:true,
          }
        }
      },
    });
  },
  findProductsByShopID: async (shop_id: string) => {
    return await prisma.product.findMany({
      where: { shop_id: shop_id },
      include: {
        category: {
          select: {
            category_name: true,
          },
        },
        productColor: {
          include: {
            color: true,
          },
        },
        productImage: {
          select: {
            image_url: true,
          },
        },
        productTagEvent: {
          include: {
            TagEvent: true,
          },
        },
        productStocks:{
          select: {
            stock_id:true,
            stock_qty:true,
            reserved_qty:true,
          }
        }
      },
    });
  },
  findProductsByIds: async (product_ids: string[]) => {
    return await prisma.product.findMany({
      where: {
        product_id: { in: product_ids },
      },
      select: {
        product_id: true,
        product_name: true,
        product_price: true,
        product_description: true,
        productImage: {
          take: 1,
          select: {
            image_url: true,
          },
        },
        productStocks:{
          select: {
            stock_id:true,
            stock_qty:true,
            reserved_qty:true,
          }
        }
      },
    });
  },
  findProductsByCategory: async (category_id: number) => {
    return await prisma.product.findMany({
      where: { category_id: category_id },
    });
  },
  createProduct: async (data: Product) => {
    const { category_id, shop_id, ...rest } = data;

    return prisma.product.create({
      data: {
        ...rest,
        ...(category_id && {
          category: {
            connect: { category_id },
          },
        }),
        ...(shop_id && {
          shop: {
            connect: { shop_id },
          },
        }),
      },
    });
  },
  createManyProduct: async (data: Product[]) => {
    const formattedData = data.map(({ category_id, shop_id, ...rest }) => ({
      ...rest,
      category_id,
      shop_id,
    }));
    return await prisma.product.createMany({
      data: formattedData,
    });
  },
  updateProduct: async (product_id: string, data: Partial<Product>) => {
    return await prisma.product.update({
      where: { product_id },
      data,
    });
  },
  deleteProduct: async (product_id: string) => {
    return await prisma.product.delete({
      where: { product_id },
    });
  },
};

export { productRepository };
