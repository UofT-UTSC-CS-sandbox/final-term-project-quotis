import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  provider_name: string;
  date_sent: Date;
  description: string;
  price_estimate: string;
  status: string;
  user_id: string; // Change this to string
  provider_id: string;
}

const QuoteSchema: Schema = new Schema({
  provider_name: { type: String, required: true },
  date_sent: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  price_estimate: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true }, // Change this to string
  provider_id: { type: String, required: true },
});

export default mongoose.model<IQuote>("Quote", QuoteSchema);
