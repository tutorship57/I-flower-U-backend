import prisma from "../../../shared/prisma/prismaClient";

interface Product {
  product_name: string;
  category_id: number;
  product_price: number;
  product_stock: number;
  product_description?: string;
  shop_id: string;
}

const productRepository = {
  getAllProduct: async () => {
    return await prisma.product.findMany({
      select: {
        product_id: true,
        product_name: true,
        product_price: true,
        product_stock: true,
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
        product_stock: true,
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
        product_stock: true,
        product_description: true,
        productImage: {
          take: 1,
          select: {
            image_url: true,
          },
        },
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
  
  decreaseStockTransaction: async (
    items: { product_id: string; quantity: number }[]
  ) => {
    return await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const p = await tx.product.findUnique({
          where: { product_id: item.product_id },
        });
        if (!p) throw new Error(`Product ${item.product_id} not found`);
        if (p.product_stock < item.quantity)
          throw new Error(`Not enough stock for ${item.product_id}`);

        await tx.product.update({
          where: { product_id: item.product_id },
          data: { product_stock: { decrement: item.quantity } },
        });
      }
    });
  },
  increaseStockTransaction: async (
    items: { product_id: string; quantity: number }[]
  ) => {
    return await prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.product.update({
          where: { product_id: item.product_id },
          data: { product_stock: { increment: item.quantity } },
        });
      }
    });
  },
  deleteProduct: async (product_id: string) => {
    return await prisma.product.delete({
      where: { product_id },
    });
  },
};

export { productRepository };
