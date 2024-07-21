import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { promisify } from "util";

const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-1";
const bucketName = process.env.AWS_BUCKET_NAME || "quotis";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are not defined in environment variables");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function generateUploadURL(): Promise<string> {
  try {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageName,
    });

    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return uploadURL;
  } catch (error) {
    console.error("Error generating upload URL:", error);
    throw new Error("Could not generate upload URL");
  }
}
