/**
 * http 모듈을 불러온다
 * host: localhost
 * port: 3000
 * 1) 서버를 생성한다
 * 2) 서버의 요청을 확인한다 -> 응답 헤더에 text/html 형식으로 '<h1>Hello World</h1>' 를 보낸다.
 * 3) 서버를 작동시키고 'server running on http://localhost:3000' 메시지를 출력한다.
 *
 * 4) url path 정보를 불러온다.
 * 5) path가 root 라면 '<h1>Home Page!</h1>' 를 보낸다.
 *    post 라면 응답, user 라면 응답, 모두 해당하지 않으면 '<h1>Page Not Found!</h1>' 메시지를 보낸다.
 */

const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page!</h1>');
  } else if (path === '/post') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Post Page!</h1>');
  } else if (path === '/user') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>User Page!</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page Not Found!</h1>');
  }
});

server.listen(port, host, () => {
  console.log(`server running on http://${host}:${port}`);
});
