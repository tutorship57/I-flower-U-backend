import { AppError } from "../../../shared/utils/appErrorCustomize.util";
import{productRepository as productRepo}from "../repository/product.repository";
import { createProductImagesService,deleteProductImagesByProductIdService} from "./productImage.service";
import { redis } from "../../../shared/redis/redis.service";
const getProductByIdService = async (product_id: string) => {
    const product = await productRepo.findProductById(product_id);
    if(!product){
        throw new AppError('Product not found', 404);
    }
    return product;
};
const getAllProductService = async () => {
    const products = await productRepo.getAllProduct();
    if(!products){
        throw new AppError('No products found', 404);
    }
    return products;
}
const getAllProductByShopIDService = async (shop_id: string) => {
    const products = await productRepo.findProductsByShopID(shop_id);
    if(!products){
        throw new AppError('No products found for this shop', 404);
    }
    return products;
}
const getProductsByCategoryService = async (category_id: number) => {
    const products = await productRepo.findProductsByCategory(category_id);
    if(!products){
        throw new AppError('No products found for this category', 404);
    }
    return products;
}
const getProductByIdsService = async (product_ids: string[]) => {
    const products = await productRepo.findProductsByIds(product_ids);
    if(!products || products.length === 0){
        throw new AppError('No products found for the given IDs', 404);
    }
    return products;
}

const createProductService = async (data: {product_name: string; category_id: number; product_price: number; product_stock: number; description?: string;shop_id: string},files: Express.Multer.File[]) => {
    const newProduct = await productRepo.createProduct(data);
    if( !newProduct){
        throw new AppError('Product creation failed', 500);
    }
    if( !files || files.length === 0){
        return newProduct;
    }
    await redis.set(`stock:${newProduct.product_id}`, newProduct.product_stock.toString());
    const newImages = await createProductImagesService(newProduct.product_id, files);
    return {...newProduct, images: newImages};
}
const createManyProductService = async (data: {product_name: string; category_id: number; product_price: number; product_stock: number; description?: string;shop_id: string}[]) => {
    const newProduct = await productRepo.createManyProduct(data);
    return newProduct;
}

const updateProductService = async (product_id: string, data: {product_name: string; category_id: number; product_price: number; product_stock: number}) => {
    const updatedProduct = await productRepo.updateProduct(product_id, data);
    return updatedProduct;
}

const increaseStockService = async (data:{product_id: string, quantity: number}[]) => {
    const updatedProduct =  await productRepo.increaseStockTransaction(data);
    return updatedProduct;
}
const decreaseStockService = async (data:{product_id: string, quantity: number}[]) => {
    const updatedProduct =  await productRepo.decreaseStockTransaction(data);
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

export {getProductByIdService,getProductByIdsService,createManyProductService, increaseStockService, decreaseStockService,getAllProductByShopIDService, getAllProductService, getProductsByCategoryService, createProductService, updateProductService, deleteProductService};