import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import User from './models/User';
import Post from './models/Post';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 요청과 응답을 로깅하는 미들웨어
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('요청 객체:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });

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

// multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

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
  const posts = await Post.find().populate('createdBy', 'email');
  res.status(200).json(posts);
});

// 포스트 생성 엔드포인트
app.post('/posts', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { title, description, category, budget, location, date, time, createdBy } = req.body;
    if (!title || !description || !category || !budget || !location || !date || !time || !createdBy) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newPost = new Post({
      title,
      description,
      category,
      budget,
      location,
      date,
      time,
      createdBy,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post', error: (err as Error).message });
  }
});

// 포스트 조회 엔드포인트
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('createdBy', 'email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch posts', error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
