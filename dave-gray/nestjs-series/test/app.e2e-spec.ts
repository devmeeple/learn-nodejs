import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[GET] /users', () => {
    return request(app.getHttpServer())
      .get('/users?role=INTERN')
      .expect(200)
      .expect(['INTERN']);
  });

  it('[GET] /users/:id', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({ id: '1' });
  });

  it('[POST] /users', () => {
    return request(app.getHttpServer()).post('/users').expect(201).expect({});
  });

  it('[PATCH] /users/:id', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .expect(200)
      .expect({ id: '1' });
  });

  it('[DELETE] /users/:id', () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .expect(200)
      .expect({ id: '1' });
  });
});
