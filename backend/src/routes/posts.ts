import express, { Request, Response } from "express";
import Post from "../models/Post";

const router = express.Router();

// Get all posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("author");
    res.json(posts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post("/", async (req: Request, res: Response) => {
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
