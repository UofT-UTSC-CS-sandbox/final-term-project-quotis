import express, { Request, Response } from "express";
import Quote from "../models/Quote"; // Import the Quote model

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

export default router;
