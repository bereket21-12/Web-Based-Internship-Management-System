import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConversationService } from 'src/chat/chat.service';


@Module({

  providers: [MessageService , ConversationService],
  controllers: [MessageController],
  exports:[MessageService],


})
export class MessageModule {}
