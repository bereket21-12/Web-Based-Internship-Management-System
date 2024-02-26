import { IsString } from "class-validator";

export class ConversationCreateDto {
    @IsString( { each: true })
    participantIds: string[];
}


/*
model Conversation {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  participantIds String[]  @db.ObjectId
  participants   User[]    @relation(fields: [participantIds], references: [id])
  messages       Message[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

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