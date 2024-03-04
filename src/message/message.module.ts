import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationService } from 'src/chat/chat.service';
import { MessageGateway } from './message.gateway';


@Module({

  providers: [MessageService , ConversationService ,MessageGateway],
  controllers: [MessageController],
  exports:[MessageService],


})
export class MessageModule {}
