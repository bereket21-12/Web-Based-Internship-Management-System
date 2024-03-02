import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { MessageModule } from '../message/message.module';
import { ConversationService } from './chat.service';

@Module({
  providers: [ConversationService],
  controllers: [ChatController],
  imports: [MessageModule],
  exports:[ConversationService]
})
export class ChatModule {}
