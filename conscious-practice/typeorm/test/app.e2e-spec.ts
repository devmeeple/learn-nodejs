import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(HttpStatus.OK);
  });

  it('/users (POST)', async () => {
    // Given
    const createRequest: CreateUserDto = {
      title: '테스트',
    };

    // When
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createRequest);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.title).toEqual('테스트');
  });

  it('/users/:id (PATCH)', async () => {
    const oldTitle = '테스트';
    const created = await request(app.getHttpServer()).post('/users').send({
      title: oldTitle,
    });
    expect(created.statusCode).toEqual(HttpStatus.CREATED);
    const id = created.body.id;

    const newTitle = '수정된 제목';
    const response = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({ title: newTitle })
      .expect(HttpStatus.OK);

    expect(response.body.title).toEqual('수정된 제목');
  });

  it('Enum Column 기본값: user', async () => {
    // Given
    const title: CreateUserDto = { title: '할 수 있다' };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(title);
    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.title).toEqual('할 수 있다');
    expect(response.body.role).toEqual('user');
  });
});
