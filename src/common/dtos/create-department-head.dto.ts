import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsBoolean, IsEmail, IsOptional } from "class-validator";

export class CreateDepartmentHeadDto {
  @IsString()
  departmentHeadFirstName: string;

  @IsString()
  departmentHeadMiddleName: string;

  @IsString()
  departmentHeadUserName: string;

  @IsString()
  @IsOptional()
  departmentHeadProfilePicUrl: string;

  @IsString()
  @IsOptional()
  departmentHeadImagePublicId: string;

  @IsString()
  departmentHeadPhoneNum: string;

  @IsString()
  @IsOptional()
  departmentHeadHashedRt: string;

  @IsBoolean()
  @IsOptional()
  departmentHeadVerified: boolean;

  @IsEmail()
  departmentHeadEmail: string;

  @IsString()
  departmentHeadPassword: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  departmentEmail: string;

  @IsString()
  departmentPhoneNum: string;

  @IsString()
  collegeId: string;

  @IsString()
  universityId: string;

  @IsString()
  departmentName: string;

}

export class UpdateDepartmentHeadDto extends PartialType(CreateDepartmentHeadDto) { }

/*
model User {
  id              String         @id @default(auto()) @map("_id") @db.ObjectId
  email           String         @unique
  password        String
  firstName       String
  middleName      String
  userName        String         @unique
  role            Role?          @relation(fields: [roleName], references: [name])
  roleName        String?
  profilePic      String
  phoneNum        String
  hashedRt        String?
  verified        Boolean?
  notifications   Notification[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  conversationIds String[]       @db.ObjectId
  conversations   Conversation[] @relation(fields: [conversationIds], references: [id])
  Student         Student[]
  Company         Company[]
  University      University[]
  College         College[]
  Department      Department[]
  Advisor         Advisor[]
  Mentor          Mentor[]
  Message         Message[]
}

model Department {
  id               String      @id @default(auto()) @map("_id") @db.ObjectId
  name             String      @unique
  departmentHeadId String      @db.ObjectId
  departmentHead   User        @relation(fields: [departmentHeadId], references: [id])
  collegeId        String      @db.ObjectId
  college          College     @relation(fields: [collegeId], references: [id])
  email            String
  phoneNum         String
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  Student          Student[]
  University       University? @relation(fields: [universityId], references: [id])
  universityId     String?     @db.ObjectId
  Advisor          Advisor[]
}
*/