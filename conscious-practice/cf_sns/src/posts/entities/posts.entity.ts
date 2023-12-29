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

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
