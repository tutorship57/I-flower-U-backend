import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials:{
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    }
});

export const uploadToR2 = async (file: Express.Multer.File,category: string) => {
  const uploadParams = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: `${category}/${Date.now()}-${file.originalname}-`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  await r2.send(new PutObjectCommand(uploadParams));

  return `${process.env.R2_PUBLIC_URL}/${process.env.R2_BUCKET_NAME}/${uploadParams.Key}`;
};

export const uploadMultipleToR2 = async (files: Express.Multer.File[],category: string) => {
    const uploadUrls: string[] = [];
    const fileKeys: string[] = [];
    for (const file of files) {
      const uploadParams = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${category}/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      await r2.send(new PutObjectCommand(uploadParams));
      const fileUrl = `${process.env.R2_PUBLIC_URL}/${process.env.R2_BUCKET_NAME}/${uploadParams.Key}`;
      uploadUrls.push(fileUrl);
      fileKeys.push(uploadParams.Key);
    }
    return { uploadUrls, fileKeys };
  }

export const deleteFromR2 = async (fileKey: string) => {
  const deleteParams = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileKey,
  };
  await r2.send(new DeleteObjectCommand(deleteParams));
};