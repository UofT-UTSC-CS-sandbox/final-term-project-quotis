import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  provider_name: string;
  date_sent: Date;
  description: string;
  price_estimate: string;
  status: string;
  user_id: string;
  provider_id: string;
  provider_date: Date; // Provider's proposed date
  client_date: Date; // Client's preferred date
  alternative_date?: Date; // Provider's alternative date (optional)
  job_post_title: string;
  client_name: string; // Add client_name
}

const QuoteSchema: Schema = new Schema({
  provider_name: { type: String, required: true },
  date_sent: { type: Date, required: true, default: Date.now },
  description: { type: String, required: true },
  price_estimate: { type: String, required: true },
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  provider_id: { type: String, required: true },
  provider_date: { type: Date, required: true },
  client_date: { type: Date, required: true },
  alternative_date: { type: Date }, // Optional field for alternative date
  job_post_title: { type: String, required: true }, // Add this line
  client_name: { type: String, required: true }, // Add this line
});

export default mongoose.model<IQuote>("Quote", QuoteSchema);
