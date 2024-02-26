import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from 'src/common/dtos/create-message.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async createMessage(dto: CreateMessageDto) {
        const newMessage = await this.prismaService.message.create({
            data: {
                content: dto.content,
                sender: {
                    connect: {
                        id: dto.userId
                    }
                },
                conversation: {
                    connect: {
                        id: dto.conversationId
                    }
                },
                read: dto.read
            }
        })
        return newMessage;
    }
}
