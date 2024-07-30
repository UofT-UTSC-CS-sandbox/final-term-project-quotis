import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  userId: string;
  title: string;
  photoUrl: string;
  description: string;
  likes: number;
  createdAt: Date;
  quotes: string[];
  jobDate: Date; // Add this line
}

const PostSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  photoUrl: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  quotes: { type: [String], required: true, default: [] },
  jobDate: { type: Date }, // Add this line
});

export default mongoose.model<IPost>("Post", PostSchema);
