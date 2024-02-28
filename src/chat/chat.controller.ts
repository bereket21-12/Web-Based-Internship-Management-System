import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { ConversationService } from './conversation.service';
import { MessageService } from './message/message.service';
@Controller('chat')
export class ChatController {
   
   
  
    constructor(
        private chatService: ChatService,
        private conversationService : ConversationService,
        private messageService :MessageService
        ) {}

        @Post('create-chat-room')
        async createMessage(@Body() createMessageDto: CreateMessageDto) {
            const { conversationId, participantIds, ...messageData } = createMessageDto;
          
            // Check for existing conversation (if conversationId is provided)
            let existingConversation;
            if (conversationId) {
              existingConversation = await this.conversationService.findById(conversationId);
            }
          
            // Create conversation if needed or use existing one
            const conversation = existingConversation || (await this.conversationService.createConversation(participantIds));
          
            // Create the message
            const newMessage = await this.messageService.createMessage(createMessageDto);
            
            return newMessage;
          }
}
