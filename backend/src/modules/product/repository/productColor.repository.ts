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
  createProductColor: async (data: ProductColorData[]) => {
    return await prisma.productColor.createMany({
      data,
    });
  },
  deleteProductColor: async (product_id: string) => {
    return await prisma.productColor.deleteMany({
      where: {
        product_id: product_id,
      },
    });
  },
};
export default productColorRepository;
