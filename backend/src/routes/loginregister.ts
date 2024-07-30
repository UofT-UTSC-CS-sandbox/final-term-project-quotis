import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User"; // User model import
import Provider from "../models/Provider"; // Provider model import

dotenv.config();

const router = express.Router();

// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(`Login attempt: email=${email}, password=${password}`);

  let user = await User.findOne({ email });
  let role = "client";
  if (!user) {
    user = await Provider.findOne({ email });
    role = "provider";
  }

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { email: user.email, role },
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token,
        role,
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } else {
      res.status(400).json({ message: "Incorrect email or password." });
    }
  } else {
    res.status(400).json({ message: "Incorrect email or password." });
  }
});

// Register user endpoint
router.post("/register/user", async (req: Request, res: Response) => {
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
      photoUrl: "placeholder",
    });
    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Failed to register user.", error: err.message });
    } else {
      res.status(500).json({ message: "Failed to register user.", error: "Unknown error" });
    }
  }
});

// Register provider endpoint
router.post("/register/provider", async (req: Request, res: Response) => {
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
      photoUri:''
    });
    await newProvider.save();
    res.status(201).json({ message: "Registration successful", user: newProvider });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: "Failed to register provider.", error: err.message });
    } else {
      res.status(500).json({ message: "Failed to register provider.", error: "Unknown error" });
    }
  }
});

export default router;
