// conversation.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, Conversation } from '@prisma/client';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createConversation(participantIds: string[]): Promise<Conversation> {
    try {
      return await this.prisma.conversation.create({
        data: {
          participantIds,
        },
      });
    } catch (error) {
      // Handle database operation error
      throw new Error('Failed to create conversation');
    }
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    try {
      return await this.prisma.conversation.findUnique({ where: { id } });
    } catch (error) {
      // Handle database operation error
      throw new Error('Failed to retrieve conversation');
    }
  }
}
