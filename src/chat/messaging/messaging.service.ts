import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MessageGateway } from './messaging.gateway';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService ,private readonly messageGateway: MessageGateway) {}
  


  async createMessage(conversationId: string, senderId: string, content: string) {
    try {
      return await this.prisma.message.create({
        data: {
          conversationId,
          senderId,
          content,
        } as any, // Type assertion for the data object
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
        where: { participantIds: userId } as any, // Explicitly specify the type as any
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

  // Add other methods for specific message operations.
}
