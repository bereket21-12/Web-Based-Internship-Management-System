// create-message.dto.ts

export class CreateMessageDto {
    readonly conversationId: string;
    readonly senderId: string;
    readonly content: string;
  }
  