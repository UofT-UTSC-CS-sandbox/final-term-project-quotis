import mongoose, { Schema, Document } from "mongoose";

interface Notification {
  type: string;
  entity_id?: string; // Rename quote_id to entity_id
  date_created: Date;
  message: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  notifications: Notification[];
  role: string; // Add the role property
  photoUrl: string;
}



const NotificationSchema = new Schema({
  type: { type: String, required: true },
  entity_id: { type: String, required: false }, // Rename quote_id to entity_id
  date_created: { type: Date, required: true },
  message: { type: String, required: true },
});

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notifications: [NotificationSchema],
    role: { type: String, required: true }, // Add role to the schema 
    photoUrl: { type: String, required: true },
  
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
