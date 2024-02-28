import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class CreateAdvisorDto {
  @IsString()
  advisorFirstName: string;

  @IsString()
  advisorMiddleName: string;

  @IsString()
  advisorUserName: string;

  @IsString()
  @IsOptional()
  advisorProfilePicUrl: string;

  @IsString()
  @IsOptional()
  advisorImagePublicId: string;

  @IsString()
  advisorPhoneNum: string;

  @IsBoolean()
  @IsOptional()
  advisorVerified: boolean;

  @IsEmail()
  advisorEmail: string;

  @IsString()
  advisorPassword: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  departmentId: string;
}

export class UpdateAdvisorDto extends PartialType(CreateAdvisorDto) { }

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

model Advisor {
  id           String     @id @default(auto()) @map("_id") @db.ObjectId
  userId       String     @db.ObjectId
  user         User       @relation(fields: [userId], references: [id])
  departmentId String     @db.ObjectId
  department   Department @relation(fields: [departmentId], references: [id])
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  Student      Student[]
  Report       Report[]
  Feedback     Feedback[]
}
*/