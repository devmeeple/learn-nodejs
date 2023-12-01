import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[GET] /post', () => {
    it('should return "Post Page"', () => {
      // given

      // expect
      return request(app.getHttpServer())
        .get('/post')
        .expect(HttpStatus.OK)
        .expect('Post Page');
    });
  });

  describe('[GET] /user', () => {
    it('should return "User Page"', () => {
      // given

      // expect
      return request(app.getHttpServer())
        .get('/user')
        .expect(HttpStatus.OK)
        .expect('User Page');
    });
  });
});
