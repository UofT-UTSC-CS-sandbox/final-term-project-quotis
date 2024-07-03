import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User";
import Post from "./models/Post";
import postRoutes from "./routes/posts";

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
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res
      .status(200)
      .json({ message: "Login successful", role: user.role, user });
  } else {
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

// Register endpoint
app.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    const error = err as mongoose.Error.ValidationError & { code?: number };

    if (error.code === 11000) { // Duplicate key error code
      res.status(400).json({ message: "Email is already associated with an account." });
    } else {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Failed to register user", error });
    }
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

// Post routes
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
