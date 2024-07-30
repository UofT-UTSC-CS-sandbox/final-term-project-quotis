import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Quote, { IQuote } from "../models/Quote";
import User from "../models/User";
import Provider from "../models/Provider";
import Post from "../models/Post";
import auth from "../middleware/auth";

const router = express.Router();

// Interface for the request body
interface QuoteBody {
  user_id: string;
  provider_id: string;
  description: string;
  price_estimate: string;
  provider_date: Date;
  client_date: Date;
  alternative_date?: Date; // Optional field for alternative date
  post_id: string;
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
    provider_date,
    client_date,
    alternative_date,
    post_id,
    client_name,
  } = req.body;

  console.log("Received quote data:", {
    user_id,
    provider_id,
    description,
    price_estimate,
    provider_date,
    client_date,
    alternative_date,
    post_id,
    client_name,
  });

  if (
    !mongoose.Types.ObjectId.isValid(user_id) ||
    !mongoose.Types.ObjectId.isValid(provider_id) ||
    !mongoose.Types.ObjectId.isValid(post_id)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid user_id, provider_id, or post_id" });
  }

  try {
    const provider = await Provider.findById(provider_id);
    if (!provider) {
      console.log("Provider not found for id:", provider_id);
      return res.status(404).json({ message: "Provider not found" });
    }

    const post = await Post.findById(post_id);
    if (!post) {
      console.log("Post not found for id:", post_id);
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      console.log("User not found for id:", user_id);
      return res.status(404).json({ message: "User not found" });
    }

    const quote = new Quote({
      user_id,
      provider_id,
      provider_name: `${provider.firstName} ${provider.lastName}`,
      client_name: `${user.firstName} ${user.lastName}`,
      description,
      price_estimate,
      client_status: "pending",
      provider_status: "pending",
      date_sent: new Date(),
      provider_date,
      client_date,
      alternative_date,
      job_post_title: post.title,
      post_id,
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

// Route to update client status of a quote
router.patch("/:id/client-status", auth, async (req: Request, res: Response) => {
  const { client_status } = req.body;
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { client_status },
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

// Route to update provider status of a quote
router.patch("/:id/provider-status", auth, async (req: Request, res: Response) => {
  const { provider_status } = req.body;
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { provider_status },
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

// Route to get all jobs based on provider_id and provider_status
router.get("/", async (req: Request, res: Response) => {
  const { provider_id, provider_status } = req.query;

  try {
    const jobs = await Quote.find({ provider_id, provider_status });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// Route to add a review to a client
router.post("/review/:clientId", async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { providerId, rating, description } = req.body;

  console.log("Received review data:", {
    clientId,
    providerId,
    rating,
    description,
  });

  if (!providerId || typeof providerId !== "string") {
    return res.status(400).json({ message: "Invalid providerId" });
  }

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description" });
  }

  try {
    const client = await User.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.reviewRatings.push(rating);
    client.reviewDescriptions.push(description);

    await client.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);

    // Check if the error is an instance of Error and has a message property
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
});

// Route to add a review to a provider
router.post("/provider-review/:providerId", async (req: Request, res: Response) => {
  const { providerId } = req.params;
  const { userId, rating, description } = req.body;

  console.log("Received review data:", {
    providerId,
    userId,
    rating,
    description,
  });

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ message: "Invalid userId" });
  }

  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Invalid rating value" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "Invalid description" });
  }

  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    provider.reviewRatings.push(rating);
    provider.reviewDescriptions.push(description);

    await provider.save();

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);

    // Check if the error is an instance of Error and has a message property
    if (error instanceof Error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: String(error) });
    }
  }
});

export default router;
