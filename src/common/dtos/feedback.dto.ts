import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";

export class CreateFeedbackDto {

    @IsOptional()
    internId: string;

    @IsOptional()
    companyId: string;

    @IsOptional()
    advisorId: string;

    @IsOptional()
    mentorId: string;

    @IsOptional()
    rating: number;

    @IsOptional()
    comment: string;

}

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {}


/*
model Feedback {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  internId  String?  @db.ObjectId
  intern    Student? @relation(fields: [internId], references: [id])
  companyId String?  @db.ObjectId
  company   Company? @relation(fields: [companyId], references: [id])
  advisorId String?  @db.ObjectId
  advisor   Advisor? @relation(fields: [advisorId], references: [id])
  mentorId  String?  @db.ObjectId
  mentor    Mentor?  @relation(fields: [mentorId], references: [id])
  rating    Int?
  comment   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Report    Report[]
}
*/