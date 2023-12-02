import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { PostsModule } from '../../src/posts/posts.module';

describe('PostsController (e2e)', () => {
  let sut: INestApplication;

  interface Post {
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    sut = moduleRef.createNestApplication();
    await sut.init();
  });

  afterAll(async () => {
    await sut.close();
  });

  describe('[GET] /posts', () => {
    it('Post 인터페이스를 반환한다', () => {
      // given
      const expected: Post = {
        author: '마틴 파울러',
        title: '리팩토링 2판',
        content: '코드 구조를 체계적으로 개선하여 효율적인 리팩터링 구현하기',
        likeCount: 0,
        commentCount: 58,
      };

      // expect
      return request(sut.getHttpServer())
        .get('/posts')
        .expect(HttpStatus.OK)
        .expect(expected);
    });
  });
});
