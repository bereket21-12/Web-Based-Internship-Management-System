import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';

@Controller('message')
export class MessageController {
    constructor(
        private messageService: MessageService
    ) {}

    @Post('create-message')
    async createMessage(@Body() dto: CreateMessageDto) {
        return this.messageService.createMessage(dto)
    }
}
