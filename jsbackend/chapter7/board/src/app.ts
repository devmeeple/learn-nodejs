import express from 'express';
import { engine } from 'express-handlebars';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.engine('.hbs', engine({ extname: '.hbs' })); // 템플릿 엔진 handlebars 등록
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

// 라우터 설정
app.get('/', (req, res) => {
  res.render('home', { title: '테스트 게시판', message: '만나서 반갑습니다' });
});

app.get('/write', (req, res) => {
  res.render('write', { title: '테스트 게시판' });
});

// 왜 콜백을 사용했을까?
app.get('/post/:id', async (req, res) => {
  console.log(req.params.id);
  res.render('post', {
    title: '테스트 게시판',
  });
});

app.listen(port, () => {
  console.log(`[server]: 서버 실행 http://localhost:${port}`);
});
