import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/User"; // User model import
import Post from "./models/Post"; // Post model import
import Provider from "./models/Provider"; // Provider model import
import postRoutes from "./routes/posts"; // Post routes import
import bcrypt from "bcrypt";
import quoteRoutes from "./routes/quotes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

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
  if (!user) {
    // If not found in User collection, check in Provider collection
    user = await Provider.findOne({ email });
  }

  if (user) {
    console.log(`User found: ${user.email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log("Password match");
      res.status(200).json({ message: "Login successful", role: user.role, user });
    } else {
      console.log("Password mismatch");
      res.status(400).json({ message: "Incorrect email or password." });
    }
  } else {
    console.log("User not found");
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

// Register endpoint
app.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;
  console.log(`Received: ${JSON.stringify(req.body)}`); // Log the received data

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    if (role === "client") {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      res.status(201).json({ message: "Registration successful", user: newUser });
    } else if (role === "provider") {
      const newProvider = new Provider({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        services: [], // Initialize with an empty services array or populate as needed
        description: '', // Add any default value or initialize as needed
        contact: '', // Add any default value or initialize as needed
        postCode: '', // Add any default value or initialize as needed
      });
      await newProvider.save();
      res.status(201).json({ message: "Registration successful", user: newProvider });
    } else {
      res.status(400).json({ message: "Invalid role" });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register user." });
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
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Get all posts endpoint
app.get("/posts", async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

// Get user details by ID endpoint
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
