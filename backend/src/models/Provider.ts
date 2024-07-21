import mongoose, { Schema, Document } from 'mongoose';

interface IProvider extends Document {
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
}

const ProviderSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add password field
  services: { type: [String], required: false }, // Make optional
  description: { type: String, required: false }, // Make optional
  contact: { type: String, required: false }, // Make optional
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  postCode: { type: String, required: false }, // Make optional
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);
