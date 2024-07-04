import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'client' | 'provider';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
}, { timestamps: true }); // Add timestamps option

export default mongoose.model<IUser>('User', UserSchema);
