import request from 'supertest';
import { App } from '../src/app';
import fs from 'fs/promises';
import path from 'node:path';

describe('HTTP Web Server Test', () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  afterAll((done) => {
    app.getHttpServer().close(done);
  });

  it('[GET] 루트(/)로 접속 하면 index.html 출력한다', async () => {
    // given
    const content = await fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf-8');

    // when
    const response = await request(app.getHttpServer()).get('/');

    // then
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual(content);
  });

  it('[404 Not Found] 잘못된 주소를 입력', async () => {
    // when
    const response = await request(app.getHttpServer()).get('/invalid-address');

    // then
    expect(response.statusCode).toEqual(404);
  });
});