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
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
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

  getServer() {
    return this.server;
  }
}