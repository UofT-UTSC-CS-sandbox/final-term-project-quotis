import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key'; // 기본 비밀 키 추가

router.use(bodyParser.json());

// 로그인 엔드포인트
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증 로직 (예: 데이터베이스 조회)
  if (username === 'user' && password === 'password') {
    // 사용자 정보로 토큰 생성
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// 사용자 정의 인터페이스로 Request 확장
interface AuthenticatedRequest extends Request {
  user?: string | object;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    if (!SECRET_KEY) throw new Error('Secret key is not defined'); // 비밀 키가 정의되지 않은 경우 예외 처리
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default router;