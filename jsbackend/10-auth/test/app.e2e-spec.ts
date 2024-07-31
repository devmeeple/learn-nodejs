import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('[GET] /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('[POST] /users', () => {
    it('유저를 추가한다', () => {
      // given
      const user = {
        email: 'andy@podo.com',
        username: 'andy',
        password: 'test1234',
      };

      // when + then
      return request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(HttpStatus.CREATED);
    });
  });

  it('[GET] /users/:email', async () => {
    // given
    const user = {
      email: 'andy@podo.com',
      username: 'andy',
      password: 'test1234',
    };
    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);
    const email = 'andy@podo.com';

    // when
    const { body } = await request(app.getHttpServer())
      .get(`/users/${email}`)
      .expect(HttpStatus.OK);

    // then
    expect(body.email).toBe('andy@podo.com');
    expect(body.username).toBe('andy');
    expect(body.password).toBe('test1234');
  });

  it('[PATCH] /users/:email', async () => {
    // given
    const user = {
      email: 'andy@podo.com',
      username: 'andy',
      password: 'test1234',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);
    const email = 'andy@podo.com';
    const data = {
      username: 'andy2',
      password: 'test12345',
    };

    // when
    const { body } = await request(app.getHttpServer())
      .patch(`/users/${email}`)
      .send(data)
      .expect(HttpStatus.OK);

    // then
    expect(body.username).toBe('andy2');
    expect(body.password).toBe('test12345');
  });

  it('[DELETE] /users/:email', async () => {
    // given
    const user = {
      email: 'andy@podo.com',
      username: 'andy',
      password: 'test1234',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);

    // when
    const { body } = await request(app.getHttpServer())
      .delete(`/users/${user.email}`)
      .expect(HttpStatus.OK);

    // then
    expect(await repository.find()).toHaveLength(0);
    expect(body.affected).toBe(1);
  });
});
