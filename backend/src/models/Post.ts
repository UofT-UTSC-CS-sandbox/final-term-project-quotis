import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  description: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPost>('Post', PostSchema);
