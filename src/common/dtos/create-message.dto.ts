import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    conversationId?: string;

    @IsString()
    userId: string;

    @IsString()
    content: string;

    @IsBoolean()
    read: boolean;
    participantIds: any;
}

/*
model Message {
  id             String       @id @default(auto()) @map("_id") @db.ObjectId
  conversationId String       @db.ObjectId
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  senderId       String       @db.ObjectId
  sender         User         @relation(fields: [senderId], references: [id])
  content        String
  read           Boolean
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}
*/