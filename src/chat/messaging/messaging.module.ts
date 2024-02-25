import { Module } from '@nestjs/common';
import { MessageService } from './messaging.service';
import { MessageController } from './messaging.controller';
import { MessageGateway } from './messaging.gateway';
import { ConversationService } from './conversation.service';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService ,MessageGateway,ConversationService],
})
export class MessageModule {}
