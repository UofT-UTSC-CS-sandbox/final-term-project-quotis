import express, { Request, Response } from "express";
import Post from "../models/Post";
import { Post as PostType } from "../models/types"; // Import Post type

const router = express.Router();

interface PostBody {
  title: string;
  description: string;
  author: string;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req: Request<{}, {}, PostBody>, res: Response) => {
  const { title, description, author } = req.body;
  const post = new Post({ title, description, author });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
