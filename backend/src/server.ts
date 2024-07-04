import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/User"; // User model import
import Post from "./models/Post"; // Post model import
import Quote from "./models/Quote"; // Quote model import
import postRoutes from "./routes/posts"; // Post routes import
import quoteRoutes from "./routes/quotes"; // Quote routes import

const app = express();
const PORT = 3000;

app.use(cors()); // This setting allows POST methods from different URLs.
app.use(bodyParser.json()); // This handles data in JSON format.

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
  const user = await User.findOne({ email, password });
  if (user) {
    res
      .status(200)
      .json({ message: "Login successful", role: user.role, user });
  } else {
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

// Register endpoint
app.post("/register", async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const newUser = new User({ email, password, role });
  await newUser.save();
  res.status(201).json({ message: "Registration successful", user: newUser });
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

// Post routes
app.use("/posts", postRoutes);

// Quote routes
app.use("/quotes", quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
