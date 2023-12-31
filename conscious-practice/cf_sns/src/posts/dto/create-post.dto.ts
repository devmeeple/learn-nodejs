import { PostsEntity } from '../entities/posts.entity';
import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto extends PickType(PostsEntity, ['title', 'content']) {
  @IsString({
    each: true,
  })
  @IsOptional()
  images?: string[] = [];
}
