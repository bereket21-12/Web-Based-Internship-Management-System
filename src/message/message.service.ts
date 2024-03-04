import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { Message } from '@prisma/client';
import { CreateMessageDto } from '../common/dtos/create-message.dto';
import { ConversationService } from '../chat/chat.service';
import { Socket } from 'socket.io';

@Injectable()
export class MessageService {
  constructor(
    private prismaService: PrismaService,
    private conversationService: ConversationService,
  ) {}

  async getConversationId(userId1: string, userId2: string): Promise<string | null> {
    const conversation = await this.prismaService.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [userId1, userId2],
        },
      },
      select: {
        id: true,
      },
    });
    return conversation ? conversation.id : null;
  }

  async createMessage(dto: CreateMessageDto): Promise<Message | null> {
    
    let conversationId: string = await this.getConversationId(dto.receiverId ,dto.senderId)
 
     try {
 
       if (!conversationId) {
 
         conversationId = await this.conversationService.createConversation([dto.receiverId,dto.senderId])
       
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
      console.log(conversationId)
       return newMessage;
     } catch (error) {
       console.error(error);
       throw new Error(`Failed to create message: ${error.message}`);
     }
   }

  async getMessages(senderId: string, receiverId: string) {
    try {
      const conversationId: string = await this.getConversationId(senderId, receiverId);
      if (conversationId) {
        const messages = await this.prismaService.message.findMany({
          where: {
            conversationId: conversationId,
          },
          select: {
            id: true,
            content: true,
            sender: true,
            createdAt: true,
          },
        });
        return messages;
      } else {
        console.log('No messages found');
        return [];
      }
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to get messages: ${error.message}`);
    }
  }
}
