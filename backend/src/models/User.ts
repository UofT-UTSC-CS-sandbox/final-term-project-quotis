import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  role: 'client' | 'provider';
  firstName:  string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstName: {type: String, required: true}, 
  lastName: {type: String, required: true},
});

export default mongoose.model<IUser>('User', UserSchema);
