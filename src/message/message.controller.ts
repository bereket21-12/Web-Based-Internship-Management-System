import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';

@Controller('message')
export class MessageController {
    
    constructor(
        private messageService: MessageService
    ) {}


    // example query  for @Post('create-message')
    // {
    //     "content": "Hello, bob", // Replace with message content
    //     "read": false, // Set message read status
    //     "senderId": "65df34ea2bbce72bba3fb085", // Replace with participant IDs
    //     "receiverId": "65df3c68e9370fda46627020"
    //   }

    @Post('create-message')
    async createMessage(@Body() dto: CreateMessageDto) {
        return this.messageService.createMessage(dto)
    }

    // http://localhost:5000/message/getmessage?sender=65df34ea2bbce72bba3fb085&receiver=65df3c68e9370fda46627020
    @Get('getmessage')
    async getmessage(@Query() params: { sender: string; receiver: string }) {
        
      console.log(params.sender, params.receiver);
      return this.messageService.getMessages(params.sender, params.receiver);
    }
    
}

