import mongoose, { Schema, Document } from "mongoose";

interface Notification {
  type: string;
  entity_id?: string; // Rename quote_id to entity_id
  date_created: Date;
  message: string;
}

export interface IProvider extends Document {
  email: string;
  password: string;
  services: string[];
  description: string;
  contact: string;
  firstName: string;
  lastName: string;
  postCode: string;
  createdAt: Date;
  updatedAt: Date;
  notifications: Notification[];
  role: string; // Add the role property, 
  photoUri: string;
}

const NotificationSchema = new Schema({
  type: { type: String, required: true },
  entity_id: { type: String, required: false }, // Rename quote_id to entity_id
  date_created: { type: Date, required: true },
  message: { type: String, required: true },
});

const ProviderSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  services: { type: [String], required: false },
  description: { type: String, required: false },
  contact: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  postCode: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  notifications: [NotificationSchema],
  role: { type: String, required: true }, // Add role to the schema 
  photoUri:{ type:String, required: true},
});

export default mongoose.model<IProvider>("Provider", ProviderSchema);
