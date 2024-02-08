import http from 'node:http';

export class App {
  private readonly server: http.Server;
  private readonly hostname: string = 'localhost';
  private readonly port: number = 3000;


  constructor() {
    this.server = http.createServer(this.requestHandler);
  }

  private requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
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