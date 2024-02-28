import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversation(participantIds: string[]): Promise<Conversation | null> {
    try {
      const existingConversation = await this.prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasSome: participantIds,
          },
        },
      });

      if (existingConversation) {
        return existingConversation;
      }

      const newConversation = await this.prisma.conversation.create({
        data: {
          participantIds,
        },
      });

      return newConversation;
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
