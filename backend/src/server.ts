import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/User";
import Post from "./models/Post";
import postRoutes from "./routes/posts";
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

  const user = await User.findOne({ email });
  if (user) {
    console.log(`User found: ${user.email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log("Password match");
      res
        .status(200)
        .json({ message: "Login successful", role: user.role, user });
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
<<<<<<< HEAD
  const { email, password, role } = req.body;
  const newUser = new User({ email, password, role });
  await newUser.save();
  res.status(201).json({ message: "Registration successful", user: newUser });
}); 

//Update User information endpoint  
app.put("/update/:id", async (req: Request, res: Response) => {
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ message: 'User to update not found' });
    }
    res.status(200).json({ message: "Update Successful", user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
=======
  const { firstName, lastName, email, password, role } = req.body;
  console.log(`Received: ${JSON.stringify(req.body)}`); // Log the received data

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register user." });
>>>>>>> d45fc3f93abc392b403aadb3d161e24f88bd8215
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

// Quote routes
app.use("/quotes", quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
