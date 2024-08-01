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

  describe('[GET] /users/:email', () => {
    it('유저를 상세 조회한다', async () => {
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

    it('등록되지 않은 유저를 조회하면 에러가 발생한다', () => {
      // given
      const email = 'andy@podo.com';

      return request(app.getHttpServer())
        .get(`/users/${email}`)
        .expect(HttpStatus.NOT_FOUND);
    });
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

  describe('[DELETE] /users/:email', () => {
    it('이메일을 사용해서 정보를 삭제한다', async () => {
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

    it('이메일을 잘못 입력하면 삭제에 실패한다', () => {
      // given
      const badEmail = 'bad@guy.com';

      // when
      return request(app.getHttpServer())
        .delete(`/users/${badEmail}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });
});
