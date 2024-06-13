import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/User';  // User 모델 import
import Post from './models/Post';  // Post 모델 import

const app = express();
const PORT = 3000;

app.use(cors()); // 이 설정은 다른 URL에서 POST 메서드를 허용합니다.
app.use(bodyParser.json()); // 데이터를 JSON 형식으로 처리합니다.

// 요청과 응답을 로깅하는 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('요청 객체:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });

  // res.send 오버라이드
  const originalSend = res.send;
  res.send = function (body) {
    console.log('응답 객체:', {
      status: res.statusCode,
      headers: res.getHeaders(),
      body: body
    });
    return originalSend.call(this, body);
  };
  
  next();
});

// MongoDB 연결
mongoose.connect('mongodb+srv://mmtimbawala:aGqX6FnhbrBbP2oD@quotis.xcfhezg.mongodb.net/Quotis?retryWrites=true&w=majority&appName=QUOTIS', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB 연결 에러:', err));

// 로그인 엔드포인트
app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ message: '로그인 성공', role: user.role, user });
  } else {
    res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }
});

// 회원가입 엔드포인트
app.post('/register', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const newUser = new User({ email, password, role });
  await newUser.save();
  res.status(201).json({ message: '회원 가입 성공', user: newUser });
});

// 포스트 가져오기 엔드포인트
app.get('/posts', async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
