import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import User from "./models/User";
import Post from "./models/Post";
import Provider from "./models/Provider";
import Quote from "./models/Quote";
import postRoutes from "./routes/posts";
import quoteRoutes from "./routes/quotes";
import bcrypt from "bcrypt";
import loginRegisterRoutes from "./routes/loginregister";
import notificationRoutes from "./routes/notifications";
import { generateUploadURL } from "./s3";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Middleware to log requests and responses
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request object:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });

  const originalSend = res.send;
  res.send = function (body) {
    console.log("Response object:", {
      status: res.statusCode,
      headers: res.getHeaders(),
      body: body,
    });
    return originalSend.call(this, body);
  };

  next();
});

// MongoDB connection
const mongoURI = process.env.DATABASE_URL;
if (!mongoURI) {
  throw new Error("MongoDB connection URL is missing in environment variables");
}

mongoose
  .connect(mongoURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Update User information endpoint
app.put("/update/:id", async (req: Request, res: Response) => {
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: "User to update not found" });
    }
    res.status(200).json({ message: "Update Successful", user });
  } catch (err) {
    console.error("Error updating user:", err);
    if (err instanceof Error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: err.message });
    } else {
      res
        .status(500)
        .json({ message: "Error updating user", error: "Unknown error" });
    }
  }
});

app.put("/updateProvider/:id", async (req: Request, res: Response) => {
  const updatedData = req.body;
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    if (!provider) {
      return res.status(404).send({ message: "Provider to update not found" });
    }
    res.status(200).json({ message: "Update Successful", provider });
  } catch (err) {
    console.error("Error updating provider:", err);
    if (err instanceof Error) {
      res
        .status(500)
        .json({ message: "Error updating provider", error: err.message });
    } else {
      res
        .status(500)
        .json({ message: "Error updating provider", error: "Unknown error" });
    }
  }
});

// Get all posts endpoint
app.use("/api", postRoutes);

app.get("/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL();
    res.send({ url });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).send({ error: "Failed to generate upload URL" });
  }
});

// Return the user
app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all providers based on the service type
app.get("/providers", async (req: Request, res: Response) => {
  const { services } = req.query;

  try {
    let providers;
    if (!services || services === "Any") {
      providers = await Provider.find();
    } else {
      providers = await Provider.find({ services: { $in: [services] } });
    }
    res.status(200).json(providers);
  } catch (error) {
    console.error("Error fetching service providers:", error);
    res.status(500).json({ error: "Error fetching service providers" });
  }
});

// Get provider details by ID
app.get("/providers/:id", async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (provider) {
      res.status(200).json(provider);
    } else {
      res.status(404).json({ message: "Provider not found" });
    }
  } catch (err: any) {
    console.error("Error fetching provider by ID:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all jobs based on provider_id and status
app.get("/jobs", async (req: Request, res: Response) => {
  const { provider_id, status } = req.query;

  try {
    const jobs = await Quote.find({ provider_id, status });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// Update job status
app.patch("/jobs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedJob = await Quote.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job status" });
  }
});

// Post routes
app.use("/posts", postRoutes);

// Quote routes
app.use("/quotes", quoteRoutes);

// Login and Register routes
app.use("/", loginRegisterRoutes);

// Notification routes
app.use("/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
