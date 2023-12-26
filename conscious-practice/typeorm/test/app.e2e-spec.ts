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

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.statusCode).toEqual(HttpStatus.OK);

    // one-to-one 관계 확인 테스트 검증
    const userWithProfileImage = response.body.find(
      (user) => user.profile && user.profile.image === 'test.jpg',
    );
    expect(userWithProfileImage).toBeDefined();
  });

  it('/users (POST)', async () => {
    // Given
    const createRequest: CreateUserDto = {
      email: 'devmeeple@gmail.com',
    };

    // When
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createRequest);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.email).toEqual('devmeeple@gmail.com');
  });

  it('/users/:id (PATCH)', async () => {
    const oldEmail: string = 'devmeeple@gmail.com';
    const created = await request(app.getHttpServer()).post('/users').send({
      email: oldEmail,
    });
    expect(created.statusCode).toEqual(HttpStatus.CREATED);
    const id = created.body.id;

    const newEmail: string = 'newmeeple@gmail.com';
    const response = await request(app.getHttpServer())
      .patch(`/users/${id}`)
      .send({ email: newEmail })
      .expect(HttpStatus.OK);

    expect(response.body.email).toEqual('newmeeple@gmail.com');
  });

  it('Enum Column 기본값: user', async () => {
    // Given
    const title: CreateUserDto = {
      email: 'devmeeple@gmail.com',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(title);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.email).toEqual('devmeeple@gmail.com');
    expect(response.body.role).toEqual('user');
  });

  it('createUserAndProfile()', async () => {
    // Given
    const user: CreateUserDto = {
      email: 'devmeeple@gmail.com',
      image: 'test.jpg',
    };

    const response = await request(app.getHttpServer())
      .post('/users/profile')
      .send(user);

    expect(response.statusCode).toEqual(HttpStatus.CREATED);
    expect(response.body.email).toEqual('devmeeple@gmail.com');
  });
});
