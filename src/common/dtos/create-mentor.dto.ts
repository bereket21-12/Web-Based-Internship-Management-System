import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateMentorDto {
  @IsString()
  mentorFirstName: string;

  @IsString()
  mentorMiddleName: string;

  @IsString()
  mentorUserName: string;

  @IsString()
  @IsOptional()
  mentorProfilePicUrl?: string;

  @IsString()
  @IsOptional()
  mentorImagePublicId: string;

  @IsString()
  mentorPhoneNum: string;

  @IsBoolean()
  @IsOptional()
  mentorVerified?: boolean = true;

  @IsString()
  @IsEmail()
  mentorEmail: string;

  @IsString()
  mentorPassword: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  companyId: string;
}

export class UpdateMentorDto extends PartialType(CreateMentorDto) { }

// firstName       String
//   middleName      String
//   userName        String @unique
//   role            Role ? @relation(fields: [roleName], references: [name])
//   roleName        String ?
//     profilePic      String
//   phoneNum        String
//   hashedRt        String ?
//     verified        Boolean ?
/*
model Mentor {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  userId    String     @db.ObjectId
  user      User       @relation(fields: [userId], references: [id])
  companyId String     @db.ObjectId
  company   Company    @relation(fields: [companyId], references: [id])
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  Student   Student[]
  Report    Report[]
  Feedback  Feedback[]
}
*/