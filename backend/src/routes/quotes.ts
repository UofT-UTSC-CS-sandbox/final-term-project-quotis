import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Quote, { IQuote } from "../models/Quote"; // Import the Quote model and interface
import User from "../models/User"; // Import the User model

const router = express.Router();

// Interface for the request body
interface QuoteBody {
  user_id: string;
  provider_name: string;
  date_sent: string;
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
router.post("/", async (req: Request<{}, {}, QuoteBody>, res: Response) => {
  const {
    user_id,
    provider_name,
    date_sent,
    description,
    price_estimate,
    status,
  } = req.body;
  const quote = new Quote({
    user_id,
    provider_name,
    date_sent,
    description,
    price_estimate,
    status,
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Route to add notification for quote action
router.post("/:id/notify", async (req: Request, res: Response) => {
  const { action } = req.body;
  console.log("Received request to notify:", req.params.id, action);

  try {
    const quote = await Quote.findById(req.params.id) as IQuote;
    if (!quote) {
      console.log("Quote not found:", req.params.id);
      return res.status(404).json({ message: "Quote not found" });
    }

    console.log("Found quote:", quote);

    const user = await User.findById(quote.user_id);
    if (user) {
      console.log("Found user:", user);
      user.notifications.push({
        type: action === "accepted" ? "quote_accepted" : "quote_denied",
        quote_id: (quote._id as mongoose.Types.ObjectId).toString(), // Convert ObjectId to string
        date_created: new Date(),
        message: `You have ${action === "accepted" ? "accepted" : "denied"} a quote.`,
      });
      await user.save();
      console.log("Notification added for user:", user);
    }

    res.status(200).json({ message: "Notification added" });
  } catch (err: any) {
    console.error("Error adding notification:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
