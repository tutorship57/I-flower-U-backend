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
const createProductColorService = async (data: {product_id: string; color_id: number}) => {
    const newProductColor = await productColorRepo.createProductColor(data);
    return newProductColor;
}
const deleteProductColorService = async (data: {product_id: string; color_id: number}) => {
    const deletedProductColor = await productColorRepo.deleteProductColor(data);
    return deletedProductColor;
}
export { getAllProductColorsService, getProductColorsByProductIdService, getProductColorByIdService, createProductColorService, deleteProductColorService };