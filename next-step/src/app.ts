import http from 'node:http';
import path from 'node:path';
import fs from 'fs/promises';

export class App {
  private readonly server: http.Server;
  private readonly hostname: string = 'localhost';
  private readonly port: number = 3000;

  constructor() {
    this.server = http.createServer(this.requestHandler.bind(this));
  }

  private async requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    if (req.url === '/') {
      try {
        const filePath = path.join(__dirname, '..', 'views', 'index.html');
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }

  /**
   * HTTP 서버 연결 수신을 대기하도록 지원
   */
  listen() {
    this.server.listen(this.port, this.hostname, () => {
      console.log(`서버 실행://${this.hostname}:${this.port}/`);
    });
  }

  getHttpServer() {
    return this.server;
  }
}