import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { FindOptionsWhere, LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsEntity } from './entities/posts.entity';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { HOST, PROTOCOL } from '../common/const/env.const';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async findAll(): Promise<PostsEntity[]> {
    return await this.postsRepository.find({
      relations: ['author'],
    });
  }

  /**
   * 오름차순으로 정렬하는 페이지네이션
   */
  async paginate(pageRequest: PaginatePostDto) {
    const where: FindOptionsWhere<PostsEntity> = {};
    if (pageRequest.where__id_less_than) {
      where.id = LessThan(pageRequest.where__id_less_than);
    } else if (pageRequest.where__id_more_than) {
      where.id = MoreThan(pageRequest.where__id_more_than);
    }

    const postList = await this.postsRepository.find({
      where: {
        // ID 값이 정의되지 않았을 때 nullish 연산자를 사용해서 0으로 할당
        id: MoreThan(pageRequest.where__id_more_than ?? 0),
      },
      order: { createdAt: pageRequest.order__createdAt },
      take: pageRequest.take,
    });

    const lastItem =
      postList.length > 0 && postList.length === pageRequest.take
        ? postList[postList.length - 1]
        : null;

    const nextURL = lastItem && new URL(`${PROTOCOL}://${HOST}/posts`);

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
      });
    }
  }

  async findById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async create(authorId: number, createPostDto: CreatePostDto) {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...createPostDto,
      likeCount: 0,
      commentCount: 0,
    });

    return await this.postsRepository.save(post);
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
