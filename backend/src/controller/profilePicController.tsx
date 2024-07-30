import Post from '../models/Post';
import User from '../models/User'
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../models/types';
import AWS from 'aws-sdk';
import { userInfo } from 'os';

// This getst the relevant env files from the env folder
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// This is a function that given a key in the S3 bucket will delete the object related to that key 
const deleteS3Object = async (key: string) => {
  const deleteParams = {         
    Bucket: "quotis",
    Key: key,
  };
  await s3.deleteObject(deleteParams).promise();
};

// This fucntion that when called given it is called with a valid userId in its parameters will return an onject 
// containing all the information on that user otherwise does nothing 
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.find({ userId });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
 
/*This function given a valid userId and valid photoUrl will update the photoUrl field of the user to the new photoURL */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body; // get data to update 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If photo URL is not included in update data, keep existing photo URL
    if (!updateData.photoUrl) {
      updateData.photoUrl = user.photoUrl;
    } else {
      const key = user.photoUrl.split('/').pop()!;
      await deleteS3Object(key);
    }

    // post update
    const updatedProfile = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json(updatedProfile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




// This function given a valid userId will delete the profile pic from the bucket
// and replace the profile pic with the default one in the database 
export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // S3에서 이미지 삭제
    const key = user.photoUrl.split('/').pop()!;
    console.log('Deleting from S3 with key:', key); // 디버깅을 위한 로그 추가

    await deleteS3Object(key); 

    //Now I want to replace this with the URL of the default image  

    res.status(200).json({ message: 'Profile Pic was deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting profile pic:', error); // 에러 로그 추가
    res.status(500).json({ error: error.message });
  }
};

