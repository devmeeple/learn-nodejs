import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  describe('[GET] /posts', () => {
    it('PostModel 반환한다.', () => {
      // given

      // when
      const postList = controller.findAll();

      // then
      expect(postList).toBeInstanceOf(Array);
      expect(postList).toHaveLength(3);
    });
  });

  describe('[GET] /posts/:id', () => {
    it('조회된 포스트를 반환한다', () => {
      // given

      // when
      const post = controller.getPost('3');

      // then
      expect(post.id).toEqual(3);
    });

    it('게시물이 없으면 NotFound Exception 을 반환한다', () => {
      // when + then
      expect(() => controller.getPost('999')).toThrowError(NotFoundException);
    });
  });

  describe('[POST] /posts', () => {
    it('게시물을 작성한다', () => {
      // given
      const createDto: CreatePostDto = {
        author: '테스트 작성자',
        title: '테스트 작성',
        content: '테스트 내용',
        likeCount: 1,
        commentCount: 1,
      };
      // when
      const beforePostList = controller.findAll().length;
      const post = controller.create(createDto);
      const afterPostList = controller.findAll().length;

      expect(post.id).toEqual(4);
      expect(afterPostList).toBeGreaterThan(beforePostList);
    });
  });

  describe('[PATCH] /posts/:id', () => {
    it('수정된 게시글을 반환한다', () => {
      // given
      const updateDto: UpdatePostDto = {
        author: '테스트 작성자2',
      };
      // when
      const updatedPost = controller.update('1', updateDto);

      // then
      expect(updatedPost.author).toEqual('테스트 작성자2');
    });
  });

  describe('[DELETE] /posts/:id', () => {
    it('게시글을 삭제한다', () => {
      // given
      const id = '1';
      // when
      const postId = controller.remove(id);

      // then
      expect(postId).toEqual('1번 게시물이 삭제되었습니다.');
    });

    it('삭제할 게시글이 없으면 에러를 반환한다', () => {
      // expect
      expect(() => controller.remove('999')).toThrowError(NotFoundException);
    });
  });
});
