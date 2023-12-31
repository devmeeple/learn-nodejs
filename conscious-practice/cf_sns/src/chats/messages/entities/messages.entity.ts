import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChatsEntity } from '../../entities/chats.entity';
import { UsersEntity } from '../../../users/entities/users.entity';
import { IsString } from 'class-validator';

@Entity()
export class MessagesEntity extends BaseEntity {
  @ManyToOne(() => ChatsEntity, (chat) => chat.messages)
  chat: ChatsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.messages)
  author: UsersEntity;

  @IsString()
  @Column()
  message: string;
}
