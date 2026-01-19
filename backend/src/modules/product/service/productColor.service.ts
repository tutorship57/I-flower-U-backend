import productColorRepo from "../repository/productColor.repository";

const getAllProductColorsService = async () => {
    const productColors = await productColorRepo.getAllProductColors();
    return productColors;
}
const getProductColorsByProductIdService = async (product_id: string) => {
    const productColors = await productColorRepo.getProductColorsByProductId(product_id);
    return productColors;
}
const getProductColorByIdService = async (color_id: number) => {
    const productColor = await productColorRepo.getProductColorById(color_id);
    return productColor;
}
const createProductColorService = async (product_id:string,data:{color_id: number}[]) => {
    const colors_data = data.map((item) => {
        return {
            product_id: product_id,
            color_id: item.color_id ,
        };
    });
    const newProductColor = await productColorRepo.createProductColor(colors_data);
    return newProductColor;
}
const deleteProductColorService = async (product_id:string) => {
    const deletedProductColor = await productColorRepo.deleteProductColor(product_id);
    return deletedProductColor;
}
export { getAllProductColorsService, getProductColorsByProductIdService, getProductColorByIdService, createProductColorService, deleteProductColorService };