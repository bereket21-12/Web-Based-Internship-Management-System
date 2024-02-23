import { Module } from '@nestjs/common';
import { MessageService } from './messaging.service';
import { MessageController } from './messaging.controller';
import { MessageGateway } from './messaging.gateway';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService ,MessageGateway],
})
export class MessageModule {}
