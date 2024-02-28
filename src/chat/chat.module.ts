import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { MessageModule } from './message/message.module';
import { ConversationService } from './conversation.service';

@Module({
  providers: [ConversationService],
  controllers: [ChatController],
  imports: [MessageModule]
})
export class ChatModule {}
