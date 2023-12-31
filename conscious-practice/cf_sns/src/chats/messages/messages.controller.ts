import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ChatMessagesService } from './messages.service';
import { BasePaginateDto } from '../../common/dto/base-paginate.dto';

@Controller('chats/:cid/messages')
export class MessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @Get()
  paginateMessage(
    @Param('cid', ParseIntPipe) cid: number,
    @Query() basePaginateDto: BasePaginateDto,
  ) {
    return this.chatMessagesService.paginateMessages(basePaginateDto, {
      where: {
        chat: {
          id: cid,
        },
      },
      relations: { author: true, chat: true },
    });
  }
}
