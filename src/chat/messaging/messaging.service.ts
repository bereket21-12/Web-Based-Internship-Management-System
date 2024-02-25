// message.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MessageGateway } from './messaging.gateway';
import { ConversationService } from './conversation.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private readonly messageGateway: MessageGateway,
    private readonly conversationService: ConversationService, // Import ConversationService
  ) {}

  async createMessage(conversationId: string, senderId: string, content: string) {
    try {
      // Ensure the conversation exists
      await this.conversationService.getConversationById(conversationId);

      // Create the message
      return await this.prisma.message.create({
        data: {
          conversationId,
          senderId,
          content,
        } as any,
      });
    } catch (error) {
      // Handle database operation error
      throw new Error('Failed to create message');
    }
  }

  async getMessages(userId: string) {
    try {
      // Find conversations where the user is a participant
      const conversations = await this.prisma.conversation.findMany({
        where: { participantIds: userId } as any,
        include: { messages: { include: { sender: true } } },
      });

      // Flatten messages from all conversations
      const messages = conversations.reduce((acc, curr) => acc.concat(curr.messages), []);

      return messages;
    } catch (error) {
      // Handle database operation error
      throw new Error('Failed to retrieve messages');
    }
  }

  sendMessage(message: any) {
    this.messageGateway.sendMessage(message);
  }
}
