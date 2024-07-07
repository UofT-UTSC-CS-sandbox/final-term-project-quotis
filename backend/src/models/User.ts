import mongoose, { Schema, Document } from 'mongoose';

interface Notification {
  type: string;
  quote_id?: string; // Make quote_id optional
  date_created: Date;
  message: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'client' | 'provider';
<<<<<<< HEAD
  firstName:  string;
  lastName: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstName: {type: String, required: true}, 
  lastName: {type: String, required: true},
=======
  createdAt: Date;
  updatedAt: Date;
  notifications: Notification[];
}

const NotificationSchema = new Schema({
  type: { type: String, required: true },
  quote_id: { type: String, required: false }, // Make quote_id optional
  date_created: { type: Date, required: true },
  message: { type: String, required: true },
>>>>>>> d45fc3f93abc392b403aadb3d161e24f88bd8215
});

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  notifications: [NotificationSchema],
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
