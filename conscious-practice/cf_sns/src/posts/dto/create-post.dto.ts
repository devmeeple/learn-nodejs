import { PostsEntity } from '../entities/posts.entity';
import { PickType } from '@nestjs/mapped-types';

export class CreatePostDto extends PickType(PostsEntity, [
  'title',
  'content',
]) {}
