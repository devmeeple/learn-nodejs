/**
 * 목표: 1_server.js 파일을 express로 마이그레이션 한다.
 * 1) yarn으로 초기화, express를 설치한다.
 * 2) Endpoint를 작성한다.
 *    200: '/', 'post', 'user', / 404: middleware
 * 3) app.use에 대해 정리한다.
 */

const express = require('express');
const host = 'localhost';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Home Page!</h1>');
});

app.get('/post', (req, res) => {
  res.send('<h1>Post Page!</h1>');
});

app.get('/user', (req, res) => {
  res.send('<h1>User Page!</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found!</h1>');
});

app.listen(port, () => {
  console.log(`server running on http://${host}:${port}`);
});