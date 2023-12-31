import { FindManyOptions } from 'typeorm';
import { PostsEntity } from '../entities/posts.entity';

export const DEFAULT_POST_FIND_OPTIONS: FindManyOptions<PostsEntity> = {
  relations: { author: true, images: true },
};
