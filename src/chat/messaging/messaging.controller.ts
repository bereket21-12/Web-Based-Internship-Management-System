import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { MessageService } from './messaging.service';
import { MessageDto } from './dto/messaging.dto';
import { MessageGateway } from './messaging.gateway';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ConversationService } from './conversation.service';
import { Conversation } from '@prisma/client';

// Consider separating controllers for clarity (e.g., ConversationController, MessageController)
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
    private readonly messageGateway: MessageGateway,
    private readonly prismaService: PrismaService
  ) {}

  @Post('send')
  async createMessage(@Body() createMessageDto: MessageDto): Promise<MessageDto> {
    const { conversationId, senderId, content } = createMessageDto;
    const newMessage = await this.messageService.createMessage(conversationId, senderId, content);

    // Send WebSocket message when a new message is created
    this.messageGateway.sendMessage(newMessage);

    return newMessage;
  }

  @Post('conversation')
  async createConversation(@Body() participantIds: string[]): Promise<Conversation> {
    const newConversation = await this.conversationService.createConversation(participantIds);
    return newConversation;
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
    const messages = await this.messageService.getMessages(conversationId); // Likely meant to be `conversationId`
    if (!messages) {
      throw new NotFoundException('No messages found for the conversation'); // Adjusted error message
    }
    return messages;
  }
}
