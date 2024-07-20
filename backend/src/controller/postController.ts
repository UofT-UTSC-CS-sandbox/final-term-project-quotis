import Post from '../models/Post';
import Notification from '../models/Notification';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../models/types'; // 주석 해제

// 유저의 포스트 가져오기
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error: any) { // 타입을 any로 명시
    res.status(500).json({ error: error.message });
  }
};

// 모든 포스트 가져오기
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error: any) { // 타입을 any로 명시
    res.status(500).json({ error: error.message });
  }
};

// 좋아요 추가
export const likePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    post.likes += 1;
    await post.save();

    // 림 생성
    await Notification.create({
      creator: req.user, // req.user is defined on AuthenticatedRequest
      type: "Like",
      title: post.title,
      userId: post.userId,
      postId: postId,
    });

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error: any) { // 타입을 any로 명시
    res.status(500).json({ error: error.message });
  }
};