import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Quote, { IQuote } from "../models/Quote";
import Provider from "../models/Provider";

const router = express.Router();

// Interface for the request body
interface QuoteBody {
  user_id: string;
  provider_id: string;
  description: string;
  price_estimate: string;
  status: string;
}

// Route to get quotes by user ID
router.get("/user/:user_id", async (req: Request, res: Response) => {
  try {
    const quotes = await Quote.find({ user_id: req.params.user_id });
    res.json(quotes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new quote
router.post("/", async (req: Request, res: Response) => {
  const { user_id, provider_id, description, price_estimate, status } =
    req.body;

  console.log("Received quote data:", {
    user_id,
    provider_id,
    description,
    price_estimate,
    status,
  });

  if (
    !mongoose.Types.ObjectId.isValid(user_id) ||
    !mongoose.Types.ObjectId.isValid(provider_id)
  ) {
    return res.status(400).json({ message: "Invalid user_id or provider_id" });
  }

  try {
    const provider = await Provider.findById(provider_id);
    if (!provider) {
      console.log("Provider not found for id:", provider_id);
      return res.status(404).json({ message: "Provider not found" });
    }

    const quote = new Quote({
      user_id,
      provider_id,
      provider_name: `${provider.firstName} ${provider.lastName}`,
      description,
      price_estimate,
      status: "pending",
      date_sent: new Date(),
    });

    const savedQuote = await quote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({ message: "Error creating quote" });
  }
});

export default router;
