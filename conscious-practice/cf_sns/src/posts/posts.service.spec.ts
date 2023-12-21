import { Test, TestingModule } from '@nestjs/testing';
import { PostModel, PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('[정의] should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[조회] findAll', () => {
    it('전체 게시글 조회는 배열을 반환한다', () => {
      // given

      // when
      const postList: PostModel[] = service.findAll();

      // then
      expect(postList).toBeInstanceOf(Array);
    });
  });

  describe('[조회] findById', () => {
    it('[성공] 단건조회된 게시글의 상세정보', () => {
      // given
      const id: number = 3;
      // when
      const post = service.findById(id);

      // then
      expect(post.id).toEqual(3);
      expect(post.title).toEqual('테스트 제목3');
      expect(post.content).toEqual('테스트 내용3');
    });

    it('[에러] 해당 게시글을 찾을 수 없습니다.', () => {
      const invalidId: number = 999;
      // when + then 함수가 호출 될 때 에러가 발생하는지 검증함
      expect(() => service.findById(invalidId)).toThrow(NotFoundException);
    });
  });

  describe('[작성] create', () => {
    it('[성공] 작성된 게시글의 상세정보', () => {
      // given
      const createRequest: CreatePostDto = {
        title: '테스트 제목4',
        content: '테스트 내용4',
        author: '테스트 작성자4',
        likeCount: 0,
        commentCount: 0,
      };

      // when
      const beforePostListLength: number = service.findAll().length;
      const post = service.create(createRequest);
      const afterPostListLength: number = service.findAll().length;

      // then
      expect(afterPostListLength).toBeGreaterThan(beforePostListLength);
      expect(post.title).toEqual('테스트 제목4');
      expect(post.content).toEqual('테스트 내용4');
      expect(post.author).toEqual('테스트 작성자4');
    });
  });

  describe('[수정] update', () => {
    it('[성공] 수정된 게시글 상세정보', () => {
      // given
      const id: number = 3;
      const updateRequest: UpdatePostDto = {
        title: '수정된 테스트 제목3',
      };
      // when
      const updatedPost = service.update(id, updateRequest);

      // then
      expect(updatedPost.id).toEqual(3);
      expect(updatedPost.title).toEqual('수정된 테스트 제목3');
      expect(updatedPost.content).toEqual('테스트 내용3');
    });

    it('[실패] 해당 게시글을 찾을 수 없습니다.', () => {
      // given
      const id: number = 999;
      const updateRequest: UpdatePostDto = {};

      // when + then
      expect(() => service.update(id, updateRequest)).toThrow(
        new NotFoundException('해당 게시글을 찾을 수 없습니다.'),
      );
    });
  });

  describe('[삭제] remove', () => {
    it('[성공]', () => {
      // given
      const id: number = 1;

      // when
      const resultMessage: string = service.remove(id);

      // then
      expect(resultMessage).toEqual('1번 게시물이 삭제되었습니다.');
    });

    it('[실패] 해당 게시글을 찾을 수 없습니다.', () => {
      // given
      const invalidId: number = 1;

      // when + then
      expect(() => service.remove(invalidId)).toThrow(
        new NotFoundException('해당 게시글을 찾을 수 없습니다.'),
      );
    });
  });
});
