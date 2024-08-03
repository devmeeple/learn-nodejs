import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Post } from '../../src/posts/entities/post.entity';
import { PostsModule } from '../../src/posts/posts.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let postsRepository: Repository<Post>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Post],
          synchronize: true,
        }),
        PostsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    postsRepository = moduleFixture.get<Repository<Post>>(
      getRepositoryToken(Post),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('[POST] /posts', () => {
    it('블로그 글 추가에 성공한다', async () => {
      // given
      const url = '/posts';
      const title = 'title';
      const content = 'content';
      const userRequest = {
        title,
        content,
      };

      // when
      await request(app.getHttpServer())
        .post(url)
        .send(userRequest)
        .expect(HttpStatus.CREATED);
      const posts = await postsRepository.find();

      // then
      expect(posts).toHaveLength(1);
      expect(posts[0].title).toEqual('title');
      expect(posts[0].content).toEqual('content');
    });
  });
});
