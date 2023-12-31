import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsEntity } from './entities/chats.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { CommonService } from '../common/common.service';
import { PaginateChatDto } from './dto/paginate-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsEntity)
    private readonly chatsRepository: Repository<ChatsEntity>,
    private readonly commonService: CommonService,
  ) {}

  paginateChats(paginateChatDto: PaginateChatDto) {
    return this.commonService.paginate(
      paginateChatDto,
      this.chatsRepository,
      { relations: { users: true } },
      'chats',
    );
  }

  async createChat(createChatDto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      users: createChatDto.userIds.map((id) => ({ id })),
    });

    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }

  async checkChatExists(chatId: number) {
    const exists = await this.chatsRepository.exist({
      where: {
        id: chatId,
      },
    });
    return exists;
  }
}
