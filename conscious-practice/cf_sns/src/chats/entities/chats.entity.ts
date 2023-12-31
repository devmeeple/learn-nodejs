import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { UsersEntity } from '../../users/entities/users.entity';
import { MessagesEntity } from '../messages/entities/messages.entity';

@Entity()
export class ChatsEntity extends BaseEntity {
  @ManyToMany(() => UsersEntity, (user) => user.chats)
  users: UsersEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.chat)
  messages: MessagesEntity;
}
