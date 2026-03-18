import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import{productRepository as productRepo}from "../repository/product.repository";
import {deleteProductImagesByProductIdService} from "./productImage.service";
import { redis } from "../../../shared/redis/redis.service";
import { bufferCheck } from "../../../shared/utils/cache.util";
const getProductByIdService = async (product_id: string) => {
    const cacheKey = `product:${product_id}`;
    let cacheProduct = await redis.get(cacheKey);
    if(cacheProduct){
        cacheProduct = bufferCheck(cacheProduct);
        return JSON.parse(cacheProduct);
    }
    const product = await productRepo.findProductById(product_id);
    await redis.setEx(cacheKey, 300, JSON.stringify(product));  
    return product;
};
const getProductOwnerShipService = async(product_id: string) => {
    const product = await productRepo.findOwnerShip(product_id);
    return product;
}
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
    const cacheKey = `product:${product_id}`;
    await redis.del(cacheKey);
    return updatedProduct;
}   

const deleteProductService = async (product_id: string) => {
    const product = await productRepo.findProductById(product_id);
    if(!product){
        throw new AppError('Product not found', 404);
    }
    const images = await deleteProductImagesByProductIdService(product_id);
    const deletedProduct = await productRepo.deleteProduct(product_id);
    const cacheKey = `product:${product_id}`;
    await redis.del(cacheKey);
    return {...deletedProduct, images: images};
}

export {getProductByIdService,getProductOwnerShipService,getProductByIdsService,createManyProductService,getAllProductByShopIDService, getAllProductService, getProductsByCategoryService, createProductService, updateProductService, deleteProductService};