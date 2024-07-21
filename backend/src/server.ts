import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
app.use(bodyParser.json({ limit: '10mb' })); // JSON body limit set to 10MB
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // URL-encoded body limit set to 10MB

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
  console.log(`Login attempt: email=${email}, password=${password}`);

  // Check in User collection
  let user = await User.findOne({ email });
  let role = "client";
  if (!user) {
    // If not found in User collection, check in Provider collection
    user = await Provider.findOne({ email });
    role = "provider";
  }

  if (user) {
    console.log(`User found: ${user.email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log("Password match");
      const token = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "1h" }
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
    } else {
      console.log("Password mismatch");
      res.status(400).json({ message: "Incorrect email or password." });
    }
  } else {
    console.log("User not found");
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

// Register user endpoint
app.post("/register/user", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(`Received: ${JSON.stringify(req.body)}`); // Log the received data

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email exists in User or Provider collections
  const userExists = await User.findOne({ email });
  const providerExists = await Provider.findOne({ email });

  if (userExists || providerExists) {
    return res.status(400).json({ message: "Email already exists." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "client",
    });
    console.log(`New user created: ${JSON.stringify(newUser)}`);
    await newUser.save();
    console.log("User saved successfully");
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err); // Log the error
    if (err instanceof Error) {
      res.status(500).json({ message: "Failed to register user.", error: err.message });
    } else {
      res.status(500).json({ message: "Failed to register user.", error: "Unknown error" });
    }
  }
});

// Register provider endpoint
app.post("/register/provider", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(`Received: ${JSON.stringify(req.body)}`); // Log the received data

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Check if email exists in User or Provider collections
  const userExists = await User.findOne({ email });
  const providerExists = await Provider.findOne({ email });

  if (userExists || providerExists) {
    return res.status(400).json({ message: "Email already exists." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newProvider = new Provider({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "provider",
      services: [], // Initialize with an empty services array or populate as needed
      description: '', // Add any default value or initialize as needed
      contact: '', // Add any default value or initialize as needed
      postCode: '', // Add any default value or initialize as needed
    });
    console.log(`New provider created: ${JSON.stringify(newProvider)}`);
    await newProvider.save();
    console.log("Provider saved successfully");
    res.status(201).json({ message: "Registration successful", user: newProvider });
  } catch (err) {
    console.error("Error during registration:", err); // Log the error
    if (err instanceof Error) {
      res.status(500).json({ message: "Failed to register provider.", error: err.message });
    } else {
      res.status(500).json({ message: "Failed to register provider.", error: "Unknown error" });
    }
  }
});

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
      res.status(500).json({ message: "Error updating user", error: err.message });
    } else {
      res.status(500).json({ message: "Error updating user", error: "Unknown error" });
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
