import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsArray } from 'class-validator';

export class CreateReportDto {
  @IsString()
  studentId: string;

  @IsString()
  advisorId?: string;

  @IsString()
  mentorId?: string;

  @IsString()
  internshipId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  attachmentUrl?: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  challengesFaced: string[];

  @IsArray()
  @IsString({ each: true })
  lessonsLearned: string[];

  @IsArray()
  @IsString({ each: true })
  tasksAccomplished: string[];

  @IsString()
  @IsOptional()
  feedbackId?: string;
}

export class UpdateReportDto extends PartialType(CreateReportDto) {}

/*
model Report {
  id                String     @id @default(auto()) @map("_id") @db.ObjectId
  studentId         String     @db.ObjectId
  student           Student    @relation(fields: [studentId], references: [id])
  advisorId         String?    @db.ObjectId
  advisor           Advisor?   @relation(fields: [advisorId], references: [id])
  mentorId          String?    @db.ObjectId
  mentor            Mentor?    @relation(fields: [mentorId], references: [id])
  internshipId      String     @db.ObjectId
  internship        Internship @relation(fields: [internshipId], references: [id])
  title             String
  attachmentUrl     String?
  feedbackId        String?    @db.ObjectId
  feedback          Feedback?  @relation(fields: [feedbackId], references: [id])
  description       String
  challengesFaced   String[]
  lessonsLearned    String[]
  tasksAccomplished String[]
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
}
*/
