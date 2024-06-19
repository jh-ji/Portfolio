// 모듈을 추출합니다.
const http = require('http');
const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
// 웹 서버를 생성합니다.
var app = express();
var router = express.Router();

app.use(cors({
    origin: '*', // 모든 도메인 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
    credentials: false // 자격 증명 비허용
}));
app.use(express.static('public'));
app.use(express.json()); // JSON 파싱 미들웨어 등록
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);// 라우트합니다.
const sequelize = new Sequelize('data', '비공개', '비밀번호비공개', {
    host: '비공개ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql' // 사용하는 데이터베이스 종류 (MySQL, PostgreSQL, SQLite 등)
});

const PostModel = require('./models/post');
const Post = PostModel(sequelize, Sequelize);
  
  // Sequelize를 사용하여 모델과 데이터베이스를 동기화합니다
sequelize.sync()
.then(() => {
    console.log('데이터베이스 및 테이블 동기화 성공');
})
.catch(err => {
    console.error('데이터베이스 및 테이블 동기화 오류:', err);
});
 
    // 데이터 조회 API (GET /posts)
app.get('/posts', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            order: [['checkDate', 'DESC']], // checkDate 필드를 기준으로 내림차순 정렬
            limit: 1 // 하나의 레코드만 가져오도록 제한 설정
          });
          res.json(posts);
    } catch (err) {
        console.error(err);
        next(err);
    }
    });
    
    // 데이터 추가 API (POST /posts)
app.post('/posts', async (req, res, next) => {
    try {
        const { location, isOpen, brightness, temp, humidity } = req.body;
        console.log(req.body);
        // Sequelize를 사용하여 데이터베이스에 데이터 추가
        const newPost = await Post.create({
          location,
          isOpen,
          brightness,
          checkDate: String(new Date()), // 현재 시간을 문자열로 저장
          temp,
          humidity
    });   
    } catch (err) {
        console.error(err);
        next(err);
      }
    });
    
  
// 웹 서버를 실행합니다.
http.createServer(app).listen(3002, function () {
    console.log('Server Running Port:3002');
});
