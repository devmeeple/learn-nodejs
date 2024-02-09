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
    app.getServer().close(done);
  });

  it('[GET] 루트(/)로 접속 하면 index.html 출력한다', async () => {
    // given
    const content = await fs.readFile(path.join(__dirname, '..', 'views', 'index.html'), 'utf-8');

    // when
    const response = await request(app.getServer()).get('/');

    // then
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual(content);
  });
});