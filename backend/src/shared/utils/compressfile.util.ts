import sharp from 'sharp';

export const compressProfileImage = async (fileBuffer: Buffer): Promise<Buffer> => {
    return await sharp(fileBuffer)
       .resize({
        width: 500,
       }).toFormat("jpeg", { quality: 75 }) .toBuffer();
}
export const compressProductImage = async (fileBuffer: Buffer): Promise<Buffer> => {
    return await sharp(fileBuffer)
       .resize({
        width: 800,
       }).toFormat("jpeg", { quality: 75 }) .toBuffer();
}