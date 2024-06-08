import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/User';  // User 모델 import

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

  // res.send 오버라이드
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

app.post('/register', async (req: Request, res: Response) => {
  //for store new user into mongo db
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('No email or password:', { email, password });
      return res.status(400).json({ message: 'Its mendatory.' });
    }
    const newUser = new User({ email, password });
    await newUser.save(); //this saves user data to mongodb.
    console.log('New user stored:', newUser);
    res.status(201).json({ message: '회원 가입 성공', user: newUser });
  } catch (err) {
    console.error('회원 가입 실패:', err);
    res.status(400).json({ message: '회원 가입 실패', error: (err as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
