import mongoose, { Schema, Document } from 'mongoose';

interface IProvider extends Document {
  email: string;
  services: string[];
  description: string;
  contact: string;
  firstName: string;
  lastName: string;
  postCode: string; // Added postal code field
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  services: { type: [String], required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  postCode: { type: String, required: true }, // Added postal code field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);
