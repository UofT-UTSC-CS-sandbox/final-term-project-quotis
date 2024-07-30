import Post from '../models/Post';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../models/types';
import AWS from 'aws-sdk';

// S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// S3에서 이미지 삭제 함수 추가
const deleteS3Object = async (key: string) => {
  const deleteParams = {
    Bucket: "quotis",
    Key: key,
  };
  await s3.deleteObject(deleteParams).promise();
};

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

export const getPIDPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;
    const updateData = req.body; // 업데이트할 데이터 가져오기
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // 사진 URL이 업데이트 데이터에 포함되지 않은 경우, 기존 사진 URL 유지
    if (!updateData.photoUrl) {
      updateData.photoUrl = post.photoUrl;
    } else {
      const key = post.photoUrl.split('/').pop()!;
      await deleteS3Object(key);
    }

    // 포스트 업데이트
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

    res.status(200).json(updatedPost);
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
    const key = post.photoUrl.split('/').pop()!;
    console.log('Deleting from S3 with key:', key); // 디버깅을 위한 로그 추가

    await deleteS3Object(key);

    // 데이터베이스에서 포스트 삭제
    await post.deleteOne();
    res.status(200).json({ message: 'Post and image deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting post:', error); // 에러 로그 추가
    res.status(500).json({ error: error.message });
  }
};

// // 모든 포스트 삭제
// export const deleteAllPosts = async (req: Request, res: Response) => {
//   try {
//     const posts = await Post.find();

//     if (posts.length === 0) {
//       return res.status(404).json({ error: 'No posts found' });
//     }

//     for (const post of posts) {
//       // S3에서 이미지 삭제
//       const key = post.photoUrl.split('/').pop()!;
//       console.log('Deleting from S3 with key:', key); // 디버깅을 위한 로그 추가

//       await deleteS3Object(key);

//       // 데이터베이스에서 포스트 삭제
//       await post.deleteOne();
//     }

//     res.status(200).json({ message: 'All posts and images deleted successfully' });
//   } catch (error: any) {
//     console.error('Error deleting all posts:', error); // 에러 로그 추가
//     res.status{500}.json({ error: error.message });
//   }
// };
