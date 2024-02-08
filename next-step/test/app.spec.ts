import request from 'supertest';
import { App } from '../src/app';

describe('HTTP Web Server Test', () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  afterAll((done) => {
    app.getServer().close(done);
  });

  it('[GET] 루트(/)로 접속 하면 Hello, World를 출력한다', async () => {
    const response = await request(app.getServer()).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello, World!\n');
  });
});