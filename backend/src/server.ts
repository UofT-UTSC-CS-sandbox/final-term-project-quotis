import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/User';  // User 모델 import
import Post from './models/Post';  // Post 모델 import

const app = express();
const PORT = 3000;

app.use(cors());//this will allows app to get post method from other url.
app.use(bodyParser.json()); //app will haddle data into json.
//this will shows how data sended.(on insepct.)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('requested instance:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });

  const originalSend = res.send;
  res.send = function (body) {
    console.log('requested instance:', {
      status: res.statusCode,
      headers: res.getHeaders(),
      body: body
    });
    return originalSend.call(this, body);
  };
  
  next();
});

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/Quotis', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB 연결 에러:', err));

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.status(200).json({ message: '로그인 성공', role: user.role, user });
  } else {
    res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
  }
});

app.post('/register', async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const newUser = new User({ email, password, role });
  await newUser.save();
  res.status(201).json({ message: '회원 가입 성공', user: newUser });
});

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
