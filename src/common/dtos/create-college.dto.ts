import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsString } from "class-validator";

export class CreateCollegeDto {
    @IsString()
    name: string;

    // @IsString()
    collegeDeanId: string;

    @IsString()
    universityId: string;

    @IsString()
    email: string;

    @IsString()
    phoneNum: string;

    @IsString()
    deanFirstName: string;

    @IsString()
    deanMiddleName: string;

    @IsString()
    deanUserName: string;

    @IsString()
    deanProfilePic: string;

    @IsString()
    deanPhoneNum: string;

    @IsString()
    deanEmail: string;

    @IsString()
    deanPassword: string;

    @IsBoolean()
    deanVerified: boolean = true;

    @IsString()
    roleName: string;
}

export class UpdateCollegeDto extends PartialType(CreateCollegeDto) {}

/*
model College {
  id            String       @id @default(auto()) @map("_id") @db.ObjectId
  name          String       @unique
  departments   Department[]
  collegeDeanId String       @db.ObjectId
  collegeDean   User         @relation(fields: [collegeDeanId], references: [id])
  universityId  String       @db.ObjectId
  university    University   @relation(fields: [universityId], references: [id])
  email         String
  phoneNum      String
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
  Form          Form[]
}

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

*/