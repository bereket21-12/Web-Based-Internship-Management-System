// message.dto.ts

export class MessageDto {
    readonly id: string;
    readonly conversationId: string;
    readonly senderId: string;
    readonly content: string;
    readonly read: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  }
  