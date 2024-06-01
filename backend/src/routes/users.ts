import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send('Name, email, and password are required');
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unexpected error occurred');
    }
  }
});

export default router;
