import { File } from "buffer";
import imageRepository from "../repository/productImage.repository";
import { deleteFromR2, uploadMultipleToR2, uploadToR2 } from "../../../shared/r2/cloudflareR2.service";
import { AppError } from "../../../shared/utils/appErrorCustomize.util";
const getAllProductImagesService = async () => {
    const images = await imageRepository.getAllImages();
    return images;
}
const getProductImageService = async (image_id: string) => {
    const image = await imageRepository.findImageById(image_id);
    if(!image){
        throw new AppError('Image not found', 404);
    }
    return image;
}
const createProductImagesService = async (product_id: string,product_files: Express.Multer.File[]) => {
    const {uploadUrls: image_url_arrays, fileKeys: file_keys}= await uploadMultipleToR2(product_files, 'product_images');
    const data = [];
    for(let i=0; i<image_url_arrays.length; i++){
        data.push({product_id: product_id, image_url: image_url_arrays[i], file_key: file_keys[i]});
    }
    const newImage = await imageRepository.createMultipleImages(data);
    return newImage;
}
const createMockImagesService = async (data:{product_id: string,image_url: string,file_key: string}[]) => {
    const newImage = await imageRepository.createMocksImages(data);
    return newImage;
}
const getImagesByProductIdService = async (product_id: string) => {
    const images = await imageRepository.findImagesByProductId(product_id);
    if(!images.length){
        throw new AppError('No images found for this product', 404);
    }
    return images;
}
const updateProductImageService = async (image_id: string, data: {product_id?: string; image_url?: string;}) => {
    const updatedImage = await imageRepository.updateImage(image_id, data); 
    return updatedImage;
}
const deleteProductImageService = async (image_id: string) => {
    const selectedImage = await imageRepository.findImageById(image_id);
    if(!selectedImage){
        throw new AppError('Image not found', 404);
    }
    await deleteFromR2(selectedImage.file_key);
    const deletedImage = await imageRepository.deleteImage(image_id);
    return deletedImage;
}
const deleteProductImagesByProductIdService = async (product_id: string) => {
    const images = await imageRepository.findImagesByProductId(product_id);
    if(!images.length){
        throw new AppError('No images found for this product', 404);
    }
    const deletedImages = [];
    for(const image of images){
        await deleteFromR2(image.file_key);
        await imageRepository.deleteImage(image.image_id);
        deletedImages.push(image);
    }
    return deletedImages;
}
export {getAllProductImagesService,createMockImagesService, getProductImageService, createProductImagesService, getImagesByProductIdService, updateProductImageService, deleteProductImageService, deleteProductImagesByProductIdService};