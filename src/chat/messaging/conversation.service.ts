import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, Conversation } from '@prisma/client';
import { conversationDto } from './dto/conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversation(participantIds: string[]): Promise<Conversation | null> {
    try {
      const newConversation = await this.prisma.conversation.create({
        data: {
            participantIds,
        },
    });
    console.log('newConversation:', newConversation); // Log the complete object
    
      // Check if newConversation is actually created
      if (!newConversation) {
        throw new Error('Failed to create conversation');
      }
      return newConversation; // Access 'kind' property if it exists
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create conversation: ${error.message}`);
    }
  }
  

  async getConversationById(id: string): Promise<Conversation | null> {
    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id },
      });
      return conversation;
    } catch (error) {
      console.error(error); // Log the full error for debugging
      throw new Error(`Failed to retrieve conversation: ${error.message}`);
    }
  }
}
