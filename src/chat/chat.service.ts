import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversation(participantIds: string[]) {
    try {


      const newConversation = await this.prisma.conversation.create({
        data: {
          participantIds,
        },
      });

     const  conversationId = newConversation.id


      return conversationId;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create conversation: ${error.message}`);
    }
  }

  async findById(id: string): Promise<Conversation | null> {
    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: {
          id,
        },
      });

      return conversation;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to find conversation: ${error.message}`);
    }
  }
}
