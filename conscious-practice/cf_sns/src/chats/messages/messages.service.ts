import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesEntity } from './entities/messages.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CommonService } from '../../common/common.service';
import { BasePaginateDto } from '../../common/dto/base-paginate.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
    private readonly commonService: CommonService,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.save({
      chat: {
        id: createMessageDto.chatId,
      },
      author: { id: createMessageDto.authorId },
      message: createMessageDto.message,
    });

    return this.messagesRepository.findOne({
      where: {
        id: message.id,
      },
      relations: { chat: true },
    });
  }

  paginateMessages(
    basePaginateDto: BasePaginateDto,
    overrideFineOptions: FindManyOptions<MessagesEntity>,
  ) {
    return this.commonService.paginate(
      basePaginateDto,
      this.messagesRepository,
      overrideFineOptions,
      'messages',
    );
  }
}
