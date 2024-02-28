import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createMessage(dto: CreateMessageDto): Promise<Message | null> {
    try {
      // Check if the conversation exists
      const existingConversation = await this.prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasSome: dto.participantIds, // Use contains for array-based filtering
          },
        },
      });
      

      if (existingConversation) {
        // Message sent to existing conversation
        const newMessage = await this.prisma.message.create({
          data: {
            content: dto.content,
            sender: { connect: { id: dto.userId } },
            conversation: { connect: { id: existingConversation.id } },
            read: dto.read,
          },
        });
        return newMessage;
      }

      // Create new conversation and message
      const newConversation = await this.prisma.conversation.create({
        data: {
          participantIds: dto.participantIds,
        },
      });

      const newMessage = await this.prisma.message.create({
        data: {
          content: dto.content,
          sender: { connect: { id: dto.userId } },
          conversation: { connect: { id: newConversation.id } },
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
