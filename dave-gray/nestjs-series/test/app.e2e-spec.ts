import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('[GET] /users', () => {
    it('유저를 전체조회한다', async () => {
      // given

      // when
      const res = await request(app.getHttpServer()).get('/users');

      // then
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.length).toEqual(5);
    });
  });

  describe('[GET] /users/:id', () => {
    it('id에 숫자를 입력하면 조회에 성공한다', async () => {
      // given

      // when
      const res = await request(app.getHttpServer()).get('/users/1');

      // then
      expect(res.status).toEqual(HttpStatus.OK);
      expect(res.body.name).toBe('테스트1');
      expect(res.body.email).toBe('test@gmail.com');
    });

    it('[ParseIntPipe] id에 숫자외에 다른 문자를 입력하면 조회에 실패한다', async () => {
      // given
      const badRequest = 'bad';

      // when
      const res = await request(app.getHttpServer()).get(
        `/users/${badRequest}`,
      );

      // then
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[POST] /users', () => {
    it('추가한 유저정보를 반환한다', async () => {
      // given
      const createUserDto: CreateUserDto = {
        name: '테스트6',
        email: 'test@gmail.com',
        role: 'ADMIN',
      };

      // when
      const res = await request(app.getHttpServer())
        .post(`/users`)
        .send(createUserDto);

      // then
      expect(res.status).toEqual(HttpStatus.CREATED);
    });
  });

  describe('[PATCH] /users/:id', () => {
    it('업데이트된 유저정보를 반환한다', async () => {
      // given
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        name: '업데이트테스트1',
      };

      // when
      const res = await request(app.getHttpServer())
        .patch(`/users/${id}`)
        .send(updateUserDto);

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.name).toBe('업데이트테스트1');
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('삭제된 유저 정보를 반환한다', async () => {
      // given
      const id = 1;

      // when
      const res = await request(app.getHttpServer()).patch(`/users/${id}`);

      // then
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.name).toBe('테스트1');
      expect(res.body.email).toBe('test@gmail.com');
    });
  });
});
