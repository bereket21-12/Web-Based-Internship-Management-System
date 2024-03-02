import { Body, Controller, Post } from '@nestjs/common';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { ConversationService } from './chat.service';
import { MessageService } from '../message/message.service';
@Controller('chat')
export class ChatController {
   
   
  
    constructor(
        private conversationService : ConversationService,
        private messageService :MessageService
        ) {}

        @Post('create-chat-room')
        async createMessage(@Body() createMessageDto: CreateMessageDto) {
          

            const newMessage = await this.messageService.createMessage(createMessageDto);
            
            return newMessage;
          }
}
