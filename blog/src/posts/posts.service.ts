import { Injectable, NotFoundException } from '@nestjs/common';
import { AddPostRequest } from './dto/add-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  save(request: AddPostRequest) {
    const post = this.postsRepository.create(request);
    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다`);
    }

    return post;
  }

  async delete(id: number) {
    await this.postsRepository.delete(id);
  }
}
