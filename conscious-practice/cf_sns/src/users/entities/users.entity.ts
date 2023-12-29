import { Column, Entity, OneToMany } from 'typeorm';
import { RolesEnum } from '../const/roles.const';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { IsEmail, IsString, Length } from 'class-validator';
import { BaseEntity } from '../../common/entities/base.entity';
import { lengthValidationMessage } from '../../common/validation-message/length-validation.message';
import { stringValidationMessage } from '../../common/validation-message/string-validation.message';
import { emailValidationMessage } from '../../common/validation-message/email-validation.message';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Length(1, 20, { message: lengthValidationMessage })
  @IsString({ message: stringValidationMessage })
  @Column({
    length: 20,
    unique: true,
  })
  nickname: string;

  @IsEmail(
    {},
    {
      message: emailValidationMessage,
    },
  )
  @IsString({ message: stringValidationMessage })
  @Column({
    unique: true,
  })
  email: string;

  /**
   * REQUEST FE -> BE: plain text(JSON) -> class instance(dto)
   * RESPONSE BE -> FE: class instance(dto) -> plain text(JSON)
   */
  @Exclude({
    toPlainOnly: true,
  })
  @Length(3, 8, {
    message: lengthValidationMessage,
  })
  @IsString({ message: stringValidationMessage })
  @Column()
  password: string;

  @Column({
    type: 'enum',
    // Object.values(RolesEnum)
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum;

  @OneToMany(() => PostsEntity, (post) => post.author)
  posts: PostsEntity[];
}
