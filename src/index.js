const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// 미들웨어 설정
app.use(cors({
  origin: [
    "https://client-5bo5yen21-mukyeuns-projects.vercel.app",
    "http://localhost:3000"  // 로컬 개발용
  ],
  credentials: true
}));
app.use(bodyParser.json());

// 임시 데이터 저장소 (메모리에 저장)
let userInfoData = [];

// POST: 사용자 정보 저장
app.post('/api/userinfo', (req, res) => {
  const userInfo = req.body;
  userInfo.id = Date.now(); // 임시 ID 생성
  userInfoData.push(userInfo);
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
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
