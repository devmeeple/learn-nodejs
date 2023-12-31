import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import {
  FindOptionsWhere,
  LessThan,
  MoreThan,
  QueryRunner,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/posts.entity';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { CommonService } from '../common/common.service';
import { ENV_HOST_KEY, ENV_PROTOCOL_KEY } from '../common/const/env-keys.const';
import { ConfigService } from '@nestjs/config';
import { ImageEntity } from '../common/entities/image.entity';
import { DEFAULT_POST_FIND_OPTIONS } from './const/default-post-find-options.const';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}

  async findAll(): Promise<PostsEntity[]> {
    return await this.postsRepository.find({ ...DEFAULT_POST_FIND_OPTIONS });
  }

  async paginate(pageRequest: PaginatePostDto) {
    return this.commonService.paginate(
      pageRequest,
      this.postsRepository,
      { ...DEFAULT_POST_FIND_OPTIONS },
      'posts',
    );
  }

  /**
   * 페이지 기반 페이지 네이션
   * data: Data[]
   * total: number
   * @param pageRequest
   */
  async pagePaginate(pageRequest: PaginatePostDto) {
    // SELECT * FROM post ORDER BY post.createdAt = ASC LIMIT [take] OFFSET [skip];
    const [postList, count] = await this.postsRepository.findAndCount({
      order: {
        createdAt: pageRequest.order__createdAt,
      },
      take: pageRequest.take,
      skip: pageRequest.take * (pageRequest.page - 1),
    });

    return {
      data: postList,
      total: count,
    };
  }

  /**
   * 오름차순으로 정렬하는 페이지네이션 커서기반
   */
  async cursorPaginate(pageRequest: PaginatePostDto) {
    const where: FindOptionsWhere<PostsEntity> = {};
    if (pageRequest.where__id__less_than) {
      where.id = LessThan(pageRequest.where__id__less_than);
    } else if (pageRequest.where__id__more_than) {
      where.id = MoreThan(pageRequest.where__id__more_than);
    }

    const postList = await this.postsRepository.find({
      where: {
        // ID 값이 정의되지 않았을 때 nullish 연산자를 사용해서 0으로 할당
        id: MoreThan(pageRequest.where__id__more_than ?? 0),
      },
      order: { createdAt: pageRequest.order__createdAt },
      take: pageRequest.take,
    });

    const lastItem =
      postList.length > 0 && postList.length === pageRequest.take
        ? postList[postList.length - 1]
        : null;

    const protocol = this.configService.get<string>(ENV_PROTOCOL_KEY);
    const host = this.configService.get<string>(ENV_HOST_KEY);

    const nextURL = lastItem && new URL(`${protocol}://${host}/posts`);

    if (nextURL) {
      for (const key of Object.keys(pageRequest)) {
        if (pageRequest[key]) {
          if (key !== 'where__id_more_than' && key !== 'where__id_less_than') {
            nextURL.searchParams.append(key, pageRequest[key]);
          }
        }
      }

      let key = null;

      if (pageRequest.order__createdAt === 'ASC') {
        key = 'where__id_more_than';
      } else {
        key = 'where__id_less_than';
      }

      nextURL.searchParams.append(key, lastItem.id.toString());
    }

    return {
      data: postList,
      cursor: {
        after: lastItem?.id ?? null,
      },
      count: postList.length,
      next: nextURL?.toString() ?? null,
    };
  }

  /**
   * 페이지네이션을 테스트 하는 테스트 함수
   */
  async generatePostList(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.create(userId, {
        title: `테스트 제목${i}`,
        content: `테스트 내용${i}`,
        images: [],
      });
    }
  }

  async findById(id: number) {
    const post = await this.postsRepository.findOne({
      ...DEFAULT_POST_FIND_OPTIONS,
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  getRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<PostsEntity>(PostsEntity)
      : this.postsRepository;
  }

  async create(
    authorId: number,
    createPostDto: CreatePostDto,
    qr?: QueryRunner,
  ) {
    const repository = this.getRepository(qr);
    const post = repository.create({
      author: {
        id: authorId,
      },
      ...createPostDto,
      images: [],
      likeCount: 0,
      commentCount: 0,
    });

    return await repository.save(post);
  }

  async update(
    postId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostsEntity> {
    const { title, content } = updatePostDto;
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    return await this.postsRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    await this.postsRepository.delete(id);

    return id;
  }
}
