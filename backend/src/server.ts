import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

import User from "./models/User"; // User model import
import Post from "./models/Post"; // Post model import
import Provider from "./models/Provider"; // Provider model import
import postRoutes from "./routes/posts"; // Post routes import
import quoteRoutes from "./routes/quotes";
import { generateUploadURL } from "./s3";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

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

  // Override res.send
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
mongoose
  .connect(
    "mongodb+srv://mmtimbawala:aGqX6FnhbrBbP2oD@quotis.xcfhezg.mongodb.net/Quotis?retryWrites=true&w=majority&appName=QUOTIS",
    {}
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Login endpoint
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret_key",
      {
        expiresIn: "1h",
      }
    );

    console.log("Token generated and sent:", token);

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login." });
  }
});

// Register endpoint
app.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      uid: uuidv4(),
    });
    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
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

app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get all providers based on the service type
app.get("/providers", async (req: Request, res: Response) => {
  const { services } = req.query;

  if (!services) {
    return res.status(400).json({ error: "Service type is required" });
  }

  try {
    const providers = await Provider.find({ services: services });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching service providers" });
  }
});

// Post routes
app.use("/posts", postRoutes);

// Quote routes
app.use("/quotes", quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
