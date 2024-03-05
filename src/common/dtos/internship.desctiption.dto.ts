import { IsArray, IsDate, IsOptional, IsString } from "class-validator";

export class InternshipDescription {
  @IsArray()
  @IsOptional()
  responsibilities: string[];

  @IsArray()
  @IsOptional()
  qualifications: string[];

  @IsOptional()
  @IsString()
  applicationInstructions: string;

  @IsDate()
  deadline: Date;
}

/*
model Internship {
  id                      String                @id @default(auto()) @map("_id") @db.ObjectId
  title                   String
  companyId               String                @db.ObjectId
  company                 Company               @relation(fields: [companyId], references: [id])
  duration                String
  startDate               DateTime
  endDate                 DateTime
  schedule                Schedule
  compensations           Compensations
  descriptionId           String                @unique
  description             InternshipDescription @relation(fields: [internshipDescriptionId], references: [id])
  createdAt               DateTime              @default(now())
  updatedAt               DateTime              @updatedAt
  internshipDescriptionId String                @unique @db.ObjectId
  Report                  Report[]
}

model InternshipDescription {
  id                      String      @id @default(auto()) @map("_id") @db.ObjectId
  responsibilities        String[]
  qualifications          String[]
  applicationInstructions String
  deadline                DateTime
  createdAt               DateTime    @default(now())
  updatedAt               DateTime    @updatedAt
  Internship              Internship?
}

enum Schedule {
  FULL_TIME
  PART_TIME
  REMOTE
}

enum Compensations {
  PAID
  UNPAID
}

*/