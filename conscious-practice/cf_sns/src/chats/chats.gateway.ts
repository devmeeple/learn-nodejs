import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import * as console from 'console';
import { ChatsService } from './chats.service';
import { EnterChatDto } from './dto/enter-chat.dto';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { ChatMessagesService } from './messages/messages.service';

@WebSocketGateway({ namespace: 'chats' })
export class ChatsGateway implements OnGatewayConnection {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatMessagesService: ChatMessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): any {
    console.log(`연결된 소켓 ID: ${socket.id}`);
  }

  @SubscribeMessage('create_chat')
  async createChat(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chat = await this.chatsService.createChat(data);
  }

  @SubscribeMessage('enter_chat')
  async enterChat(
    @MessageBody() data: EnterChatDto,
    @ConnectedSocket() socket: Socket,
  ) {
    for (const chatId of data.chatIds) {
      const exists = await this.chatsService.checkChatExists(chatId);
      if (!exists) {
        throw new WsException({
          statusCode: 100,
          message: `존재하지 않는 채팅입니다 chatId: ${chatId}`,
        });
      }
    }

    socket.join(data.chatIds.map((value) => value.toString()));
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const chatExists = await this.chatsService.checkChatExists(
      createMessageDto.chatId,
    );

    if (!chatExists) {
      throw new WsException(
        `존재하지 않는 채팅방입니다. chatId: ${createMessageDto.chatId}`,
      );
    }

    const message =
      await this.chatMessagesService.createMessage(createMessageDto);

    socket
      .to(message.chat.id.toString())
      .emit('receive_message', createMessageDto.message);
  }
}
