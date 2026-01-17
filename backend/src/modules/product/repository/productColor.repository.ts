import prisma from "../../../shared/prisma/prismaClient";

type ProductColorData = {
  product_id: string;
  color_id: number;
};

const productColorRepository = {
  getAllProductColors: async () => {
    return await prisma.productColor.findMany({});
  },
  getProductColorsByProductId: async (product_id: string) => {
    return await prisma.productColor.findMany({
      where: { product_id },
    });
  },
  getProductColorById: async (color_id: number) => {
    return await prisma.productColor.findMany({
      where: { color_id },
    });
  },
  createProductColor: async (data: ProductColorData) => {
    return await prisma.productColor.create({
      data,
    });
  },
  deleteProductColor: async (data: ProductColorData) => {
    return await prisma.productColor.delete({
      where: {
        product_id_color_id: {
          product_id: data.product_id,
          color_id: data.color_id,
        },
      },
    });
  },
};
export default productColorRepository;
