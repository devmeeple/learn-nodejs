import { PickType } from '@nestjs/mapped-types';
import { MessagesEntity } from '../entities/messages.entity';
import { IsNumber } from 'class-validator';

export class CreateMessageDto extends PickType(MessagesEntity, ['message']) {
  @IsNumber()
  chatId: number;

  @IsNumber()
  authorId: number;
}
