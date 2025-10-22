import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function uploadToS3(key: string, data: any){
    const bucket = process.env.BUCKET_NAME!;

    const body = JSON.stringify(data, null, 2);

    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: "application/json",
    });

    await s3.send(command);

    return `https://${bucket}.s3${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

