import express, { Request as ExpressRequest, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";
import Post from "../models/Post"; // Post model import
import dotenv from "dotenv";
import {
  getUserPosts,
  getAllPosts,
  likePost,
} from "../controller/postController"; // Removed .ts extension
import authenticateToken from "../middleware/auth"; // Corrected import statement

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// File upload endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ error: "No file uploaded" });
    }
    const bucketName = process.env.AWS_BUCKET_NAME;
    if (!bucketName) {
      return res.status(500).send({ error: "Bucket name is not defined" });
    }
    const fileName = `${uuidv4()}-${file.originalname}`;
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const uploadResult = await s3.upload(params).promise();
    res.status(200).send({ fileUrl: uploadResult.Location });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

// Post creation endpoint
router.post("/create-post", async (req, res) => {
  try {
    const { userId, title, photoUrl, description } = req.body;
    const newPost = new Post({
      userId,
      title,
      photoUrl,
      description,
      createdAt: new Date(),
    });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

// DELETE /posts/:id - Post deletion endpoint
import { Request } from "express";

// After user authentication, extract user ID
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

router.delete(
  "/delete-post/:id",
  async (req: AuthenticatedRequest & Request, res) => {
    const { id } = req.params;
    const userId = req.user?.id; // Extract user ID after authentication

    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }
      if (post.userId.toString() !== userId) {
        return res
          .status(403)
          .send({ error: "Not authorized to delete this post" });
      }
      await Post.deleteOne({ _id: id });
      res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Failed to delete the post" });
    }
  }
);

// Fetch all posts endpoint
router.get("/", authenticateToken, getAllPosts);

// Fetch user posts endpoint
router.get("/user/:userId", authenticateToken, getUserPosts);

// Add like to post endpoint
router.put(
  "/like/:postId",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await likePost(req, res);
    } catch (error) {
      res.status(500).send({ error: (error as Error).message });
    }
  }
);

export default router;
