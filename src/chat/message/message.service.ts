import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async createMessage(dto: CreateMessageDto): Promise<Message | null> {
    try {
      // Check if the conversation exists
      const conversation = await this.prismaService.conversation.findFirst({
        where: {
          id: dto.conversationId,
        },
      });

      if (!conversation) {
        throw new Error('Conversation not found'); // Handle non-existent conversation
      }

      // Create the new message if the conversation exists
      const newMessage = await this.prismaService.message.create({
        data: {
          content: dto.content,
          sender: { connect: { id: dto.userId } },
          conversation: { connect: { id: dto.conversationId } },
          read: dto.read,
        },
      });

      return newMessage;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create message: ${error.message}`);
    }
  }
}
