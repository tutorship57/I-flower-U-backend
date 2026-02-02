import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import{productRepository as productRepo}from "../repository/product.repository";
import { createProductImagesService,deleteProductImagesByProductIdService} from "./productImage.service";
import { redis } from "../../../shared/redis/redis.service";
const getProductByIdService = async (product_id: string) => {
    const product = await productRepo.findProductById(product_id);
    return product;
};
const getAllProductService = async () => {
    const products = await productRepo.getAllProduct();
    return products;
}
const getAllProductByShopIDService = async (shop_id: string) => {
    const products = await productRepo.findProductsByShopID(shop_id);
    return products;
}
const getProductsByCategoryService = async (category_id: number) => {
    const products = await productRepo.findProductsByCategory(category_id);
    return products;
}
const getProductByIdsService = async (product_ids: string[]) => {
    const products = await productRepo.findProductsByIds(product_ids);
    return products;
}

const createProductService = async (data: {product_name: string; category_id: number; product_price: number; product_stock: number; description?: string;shop_id: string}) => {
    const newProduct = await productRepo.createProduct(data);
    return newProduct;
}
const createManyProductService = async (data: {product_name: string; category_id: number; product_price: number; product_stock: number; description?: string;shop_id: string}[]) => {
    const newProduct = await productRepo.createManyProduct(data);
    return newProduct;
}

const updateProductService = async (product_id: string, data: {product_name: string; category_id: number; product_price: number; product_stock: number}) => {
    const updatedProduct = await productRepo.updateProduct(product_id, data);
    return updatedProduct;
}   

const deleteProductService = async (product_id: string) => {
    const product = await productRepo.findProductById(product_id);
    if(!product){
        throw new AppError('Product not found', 404);
    }
    const images = await deleteProductImagesByProductIdService(product_id);
    const deletedProduct = await productRepo.deleteProduct(product_id);
    return {...deletedProduct, images: images};
}

export {getProductByIdService,getProductByIdsService,createManyProductService,getAllProductByShopIDService, getAllProductService, getProductsByCategoryService, createProductService, updateProductService, deleteProductService};