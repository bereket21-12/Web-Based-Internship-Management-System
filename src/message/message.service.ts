import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ConversationService } from '../chat/chat.service';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService ,private conversationservice : ConversationService) {}

  

  async createMessage(dto: CreateMessageDto): Promise<Message | null> {
    
   let conversationId: string = await this.getConversationId(dto.receiverId ,dto.senderId)

    try {

      if (!conversationId) {

        conversationId = await this.conversationservice.createConversation([dto.receiverId,dto.senderId])
      
        console.log('Conversation not found'); // Handle non-existent conversation
      }

      // Create the new message if the conversation exists
      const newMessage = await this.prismaService.message.create({
        data: {
          content: dto.content,
          sender: { connect: { id: dto.senderId } },
          conversation: { connect: { id :conversationId } },
          read: dto.read,
          receiver : { connect: { id: dto.receiverId } }

        },
      });

      return newMessage;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create message: ${error.message}`);
    }
  }

    async getConversationId(userId1: string, userId2: string){
    const conversation = await this.prismaService.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [userId1, userId2] // Check if both user IDs are present in the participantIds array
        }
      },
      select: {
        id: true // Select the id field of the conversation
      }
    });
  
    return conversation ? conversation.id : null; // Return the id if a conversation is found, null otherwise
  }
  
}
