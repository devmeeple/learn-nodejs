import { Column, Entity, ManyToOne } from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';
import { IsString } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';

@Entity('posts')
export class PostsEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.posts, {
    nullable: false,
  })
  author: UsersEntity;

  @IsString({
    message: stringValidationMessage,
  })
  @Column()
  title: string;

  @IsString({
    message: stringValidationMessage,
  })
  @Column()
  content: string;

  // 데이터베이스에 이미지를 저장할 때 직접 저장하는 것은 리소스 소모가 너무 크다. 따라서 파일위치를 저장한다.
  @Column({
    nullable: true,
  })
  image?: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
