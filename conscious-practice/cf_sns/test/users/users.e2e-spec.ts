import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';

describe('UsersController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('[GET] /users 전체조회 결과를 반환한다', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.statusCode).toEqual(HttpStatus.OK);
  });

  describe('[POST] /users', () => {
    const CREATE_USER_URL = '/users';
    it('[성공] 유저를 생성한다 ', async () => {
      // given
      const send: CreateUserDto = {
        nickname: '테스트',
        email: 'test@gmail.com',
        password: 'test',
      };

      // when + then
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send(send)
        .expect(HttpStatus.CREATED);
    });
  });
});
