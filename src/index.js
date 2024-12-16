const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// 기본 로깅만 사용
app.use(morgan('dev'));

app.use(cors({
  origin: [
    "https://client-5bo5yen21-mukyeuns-projects.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true
}));
app.use(bodyParser.json());

// 간단한 요청 로깅
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 임시 데이터 저장소
let userInfoData = [];

// POST: 사용자 정보 저장
app.post('/api/userinfo', (req, res) => {
  const userInfo = req.body;
  userInfo.id = Date.now();
  userInfoData.push(userInfo);
  console.log('Saved:', userInfo.id);
  res.json({ 
    success: true, 
    message: '저장 성공', 
    data: userInfo 
  });
});

// GET: 모든 사용자 정보 조회
app.get('/api/userinfo', (req, res) => {
  res.json({
    success: true,
    data: userInfoData
  });
});

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
