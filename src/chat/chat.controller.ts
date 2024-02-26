import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ConversationCreateDto } from 'src/common/dtos/create-conversation.dto';

@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService
        ) {}

        @Post('create-chat-room')
        async createChatRoom(@Body() dto: ConversationCreateDto) {
            return this.chatService.createChatRoom(dto)
        }
}
