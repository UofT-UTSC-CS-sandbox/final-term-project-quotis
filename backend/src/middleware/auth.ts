import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "../models/User"; // Ensure you have this model imported
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

router.use(bodyParser.json());

// 로그인 엔드포인트
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Replace with your actual user lookup logic

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({
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
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
});

// 사용자 정의 인터페이스로 Request 확장
interface AuthenticatedRequest extends Request {
  user?: string | object;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    if (!SECRET_KEY) throw new Error("Secret key is not defined");
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default router;
