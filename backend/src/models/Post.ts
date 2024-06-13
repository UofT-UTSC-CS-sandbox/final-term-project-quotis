// src/models/Post.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  description: string;
  category: string;
  budget: string;
  location: string;
  date: string;
  time: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  image: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: false }
});

export default mongoose.model<IPost>('Post', PostSchema);
