import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { MessageService } from './messaging.service';
import { CreateMessageDto } from './dto/creatmessaging.dto';
import { MessageDto } from './dto/messaging.dto';
import { MessageGateway } from './messaging.gateway'; // Import MessageGateway

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway, // Inject MessageGateway
  ) {}

  @Post('send')
  async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<MessageDto> {
    const { conversationId, senderId, content } = createMessageDto;
    const newMessage = await this.messageService.createMessage(conversationId, senderId, content);
    
    // Send WebSocket message when a new message is created
    this.messageGateway.sendMessage(newMessage);

    return newMessage;
  }

  @Get(':userId')
  async getMessages(@Param('userId') userId: string): Promise<MessageDto[]> {
    const messages = await this.messageService.getMessages(userId);
    if (!messages) {
      throw new NotFoundException('No messages found for the user');
    }
    return messages;
  }
}
