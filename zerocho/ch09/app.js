const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('node:path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

/**
 * 설정
 * 1) 로깅
 * 2) 클라이언트 요청
 */

app.use(morgan('dev')); // 로깅 설정 / 개발: dev, 운영: combined
app.use(express.static(path.join(__dirname, 'public'))); // 클라이언트에서 서버 폴더에 접근할 수 있도록 수정

// json & form 요청 허용
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie 전송 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, // https를 적용할 때 true로 수정
  },
}));

app.use('/', pageRouter);

// 없는 페이지 요청
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러 로그를 서비스에 위임
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`[${app.get('port')}] 번 포트에서 실행중`);
});
