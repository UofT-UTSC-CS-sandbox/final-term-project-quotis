import Post from '../models/Post';
import Notification from '../models/Notification';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../models/types';
import AWS from 'aws-sdk';

// S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// 유저의 포스트 가져오기
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 모든 포스트 가져오기
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error: any) {
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

    // 알림 생성
    await Notification.create({
      creator: req.user,
      type: "Like",
      title: post.title,
      userId: post.userId,
      postId: postId,
    });

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 포스트 삭제
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // S3에서 이미지 삭제
    const deleteParams = {
      Bucket: "quotis",
      Key: post.photoUrl.split('/').pop()!, // 이미지 키 사용
    };

    console.log('Deleting from S3 with params:', deleteParams); // 디버깅을 위한 로그 추가

    await s3.deleteObject(deleteParams).promise();

    // 데이터베이스에서 포스트 삭제
    await post.deleteOne();
    res.status(200).json({ message: 'Post and image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting post:', error); // 에러 로��� 추가
    res.status(500).json({ error: error.message });
  }
};