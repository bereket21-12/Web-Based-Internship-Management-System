import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MessageModule } from './message/message.module';
import { ConversationService } from './conversation.service';

@Module({
  providers: [ChatService , ConversationService],
  controllers: [ChatController],
  imports: [MessageModule]
})
export class ChatModule {}
