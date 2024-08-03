import { Injectable } from '@nestjs/common';
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

  findById(id: number) {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }
}
