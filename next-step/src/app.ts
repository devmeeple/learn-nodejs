import http from 'node:http';
import path from 'node:path';
import fs from 'fs/promises';
import { logger } from './middlewares/logger';
import { User } from './model/user';

export class App {
  private readonly server: http.Server;
  private readonly hostname: string = 'localhost';
  private readonly port: number = 3000;

  constructor() {
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  private async requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      if (req.url === '/') {
        const filePath = path.join(__dirname, '..', 'views', 'index.html');
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } else if (req.url === '/user/form') {
        const filePath = path.join(__dirname, '..', 'views/user', 'form.html');
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } else if (req.url?.startsWith('/user/create')) { // 회원가입 처리 로직
        logger.info('회원가입 로직 처리');
        // 파싱된 URL
        const baseURL: string = `http://${req.headers.host}`;
        const parsedURL = new URL(req.url, baseURL);

        logger.info(`요청 정보: ${parsedURL.toString()}`);
        const { userId, password, name, email } = this.extractUserParams(req.url, baseURL);
        // User 인스턴스 생성 및 저장
        const user = new User(userId, password, name, email);

        logger.info(`User model에 저장된 데이터: ${JSON.stringify(user)}`);

        // 사용자에게 성공 메시지 전송
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('회원가입 성공');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }

  /**
   * User 에 저장할 데이터 추출
   */
  private extractUserParams(url: string, baseURL: string) {
    const searchParams = new URL(url, baseURL).searchParams;
    return {
      userId: searchParams.get('userId'),
      password: searchParams.get('password'),
      name: searchParams.get('name'),
      email: searchParams.get('email'),
    };
  }

  /**
   * HTTP 서버 연결 수신을 대기하도록 지원
   */
  listen() {
    this.server.listen(this.port, this.hostname, () => {
      logger.info(`서버 실행://${this.hostname}:${this.port}/`);
    });
  }

  getHttpServer() {
    return this.server;
  }
}