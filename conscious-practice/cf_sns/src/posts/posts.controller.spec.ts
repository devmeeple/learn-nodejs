import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let sut: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    sut = module.get<PostsController>(PostsController);
  });

  describe('[GET] /', () => {
    it('Post 인터페이스를 반환한다.', () => {
      // given
      interface Post {
        author: string;
        title: string;
        content: string;
        likeCount: number;
        commentCount: number;
      }

      const expected: Post = {
        author: '마틴 파울러',
        title: '리팩토링 2판',
        content: '코드 구조를 체계적으로 개선하여 효율적인 리팩터링 구현하기',
        likeCount: 0,
        commentCount: 58,
      };

      // when
      const actual = sut.getPost();

      // then
      expect(actual).toStrictEqual(expected);
    });
  });
});
