import { Injectable } from '@nestjs/common';
import { ConversationCreateDto } from 'src/common/dtos/create-conversation.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(
        private prismaService: PrismaService,
    ) {}

    async createChatRoom(dto: ConversationCreateDto) {
        const newChatRoom = await this.prismaService.conversation.create({
            data: {
                participants: {
                    connect: dto.participantIds.map(participant => {
                        return {
                            id: participant
                        }
                    })
                }
            }
        })
        return newChatRoom;
    }
}
