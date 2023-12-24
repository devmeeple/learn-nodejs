import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';
import { PostsEntity } from './entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let id; // 테스트 게시글 ID

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // 개선 필요
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'postgres',
          entities: [PostsEntity],
          synchronize: true, // 개발환경에서는 true로 하는게 좋지만, 프로덕션 환경에서는 의도치 않은 변화가 발생할 수 있기 때문에 false
        }),
        TypeOrmModule.forFeature([PostsEntity]),
      ],
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
    const post = await service.create({
      author: '테스트',
      title: '테스트 제목',
      content: '테스트 내용',
      likeCount: 0,
      commentCount: 0,
    });
    id = post.id;
  });

  // afterAll 필요

  it('[정의] should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('[조회] findAll', () => {
    it('[성공] 전체 게시글 조회', async () => {
      // when
      const postList = await service.findAll();

      // then
      expect(postList).toBeInstanceOf(Array);
      expect(postList[0].author).toEqual('테스트');
      expect(postList[0].title).toEqual('테스트 제목');
      expect(postList[0].content).toEqual('테스트 내용');
    });
  });

  describe('[조회] findById', () => {
    it('[성공] 단건조회된 게시글의 상세정보', async () => {
      // given

      // when
      const post: PostsEntity = await service.findById(id);

      // then
      expect(post.title).toEqual('테스트 제목');
      expect(post.content).toEqual('테스트 내용');
    });

    it('[에러] 해당 게시글을 찾을 수 없습니다.', async () => {
      // given
      const invalidId: number = 999;

      // when + then 함수가 호출 될 때 에러가 발생하는지 검증함
      await expect(
        async () => await service.findById(invalidId),
      ).rejects.toThrowError(
        new NotFoundException('해당 게시글을 찾을 수 없습니다.'),
      );
    });
  });

  describe('[수정] update', () => {
    it('[성공] 수정된 게시글 상세정보', async () => {
      // given
      const updateRequest: UpdatePostDto = {
        title: '업데이트 테스트',
        content: '수정된 내용',
      };
      // when
      const updatedPost = await service.update(id, updateRequest);

      // then
      expect(updatedPost.title).toEqual('업데이트 테스트');
      expect(updatedPost.content).toEqual('수정된 내용');
    });

    it('[실패] 해당 게시글을 찾을 수 없습니다.', async () => {
      // given
      const id: number = 999;
      const updateRequest: UpdatePostDto = {};

      // when + then
      await expect(
        async () => await service.update(id, updateRequest),
      ).rejects.toThrowError(
        new NotFoundException('해당 게시글을 찾을 수 없습니다.'),
      );
    });
  });

  describe('[삭제] remove', () => {
    it('[성공]', async () => {
      // when
      const deleteId = await service.remove(id);

      // then
      expect(deleteId).toEqual(id);
    });

    it('[실패] 해당 게시글을 찾을 수 없습니다.', async () => {
      // given
      const invalidId: number = 999;

      // when + then
      await expect(
        async () => await service.remove(invalidId),
      ).rejects.toThrowError(
        new NotFoundException('해당 게시글을 찾을 수 없습니다.'),
      );
    });
  });
});
