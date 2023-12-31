import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsEntity } from './entities/chats.entity';
import { CommonModule } from '../common/common.module';
import { ChatMessagesService } from './messages/messages.service';
import { MessagesEntity } from './messages/entities/messages.entity';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsEntity, MessagesEntity]),
    CommonModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsGateway, ChatsService, ChatMessagesService],
})
export class ChatsModule {}
