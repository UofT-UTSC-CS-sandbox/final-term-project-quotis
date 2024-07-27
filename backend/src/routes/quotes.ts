import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Quote, { IQuote } from "../models/Quote";
import Provider from "../models/Provider";
import auth from "../middleware/auth";

const router = express.Router();

// Interface for the request body
interface QuoteBody {
  user_id: string;
  provider_id: string;
  description: string;
  price_estimate: string;
  status: string;
  provider_date: Date;
  client_date: Date;
  alternative_date?: Date; // Optional field for alternative date
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
  const {
    user_id,
    provider_id,
    description,
    price_estimate,
    status,
    provider_date,
    client_date,
    alternative_date,
  } = req.body;

  console.log("Received quote data:", {
    user_id,
    provider_id,
    description,
    price_estimate,
    status,
    provider_date,
    client_date,
    alternative_date,
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
      provider_date,
      client_date,
      alternative_date, // Add this line
    });

    const savedQuote = await quote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({ message: "Error creating quote" });
  }
});

// Route to delete a quote by ID
router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ msg: "Quote not found" });
    }
    await quote.deleteOne();
    res.json({ msg: "Quote removed" });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Route to update quote status
router.patch("/:id/status", auth, async (req: Request, res: Response) => {
  const { status } = req.body;
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!quote) {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.json(quote);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send("Server error");
    } else {
      console.error("Unknown error", err);
      res.status(500).send("Server error");
    }
  }
});

export default router;
