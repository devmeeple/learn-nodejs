import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { join } from 'path';
import { POST_IMAGE_PATH, POST_PUBLIC_IMAGE_PATH } from '../const/path.const';
import { PostsEntity } from '../../posts/entities/posts.entity';

export enum ImageEntityType {
  POST_IMAGE,
}

/**
 * order: 사용자가 이미지를 올린 순서
 * type: 사용자 프로필 이미지 / 포스트 이미지 타입 구분
 */
@Entity('image')
export class ImageEntity extends BaseEntity {
  @Column({
    default: 0,
  })
  @IsInt()
  @IsOptional()
  order: number;

  @IsEnum(ImageEntityType)
  @IsString()
  @Column({
    enum: ImageEntityType,
  })
  type: ImageEntityType;

  @Transform(({ value, obj }) => {
    if (obj.type === ImageEntityType.POST_IMAGE) {
      return `${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  @IsString()
  @Column()
  path: string;

  @ManyToOne(() => PostsEntity, (post) => post.images)
  post?: PostsEntity;
}
