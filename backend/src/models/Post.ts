import mongoose, { Document, Schema } from 'mongoose';

export interface Post extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId; // 사용자 ID 참조
  title: string;
  description: string;
  photoUrl: string;
  createdAt: Date;
  likes: number; // 좋아요 수 추가
}

const PostSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 } // 좋아요 수 초기값 0
});

export default mongoose.model<Post>('Post', PostSchema);