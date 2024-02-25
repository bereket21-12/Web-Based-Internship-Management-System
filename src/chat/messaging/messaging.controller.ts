import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { MessageService } from './messaging.service';
import { MessageDto } from './dto/messaging.dto';
import { MessageGateway } from './messaging.gateway'; // Import MessageGateway
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ConversationService } from './conversation.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway, // Inject MessageGateway
    private prismaservice : PrismaService,
    private conversa : ConversationService
  ) {}

  @Post('send')
  async createMessage(@Body() createMessageDto: MessageDto): Promise<MessageDto> {
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

  @Get(':conversationId')
  async conversation(@Param('userId') conversationId: string): Promise<MessageDto[]> {

    const messages = await this.messageService.getMessages(conversationId);
    const user = this.prismaservice.user.findUnique({
      where: {
          email: conversationId
      }
  })
    if (!messages) {
      throw new NotFoundException('No messages found for the user');
    }
    return messages;
  }
}
