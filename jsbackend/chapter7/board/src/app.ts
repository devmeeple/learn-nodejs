import express from 'express';
import { engine } from 'express-handlebars';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.engine('handlebars', engine()); // 템플릿 엔진 handlebars 등록
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// 라우터 설정
app.get('/', (req, res) => {
  res.render('home', { title: '안녕하세요', message: '만나서 반갑습니다' });
});

app.listen(port, () => {
  console.log(`[server]: 서버 실행 http://localhost:${port}`);
});
