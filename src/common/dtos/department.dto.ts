import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { AddressDto } from "./address.dto";

// id               String      @id @default(auto()) @map("_id") @db.ObjectId
// name             String      @unique
// departmentHeadId String      @db.ObjectId
// departmentHead   User        @relation(fields: [departmentHeadId], references: [id])
// collegeId        String      @db.ObjectId
// college          College     @relation(fields: [collegeId], references: [id])
// email            String
// phoneNum         String
// createdAt        DateTime    @default(now())
// updatedAt        DateTime    @updatedAt
// Student          Student[]
// University       University? @relation(fields: [universityId], references: [id])
// universityId     String?     @db.ObjectId
// Advisor          Advisor[]

export class departmentRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    phoneNum: string;

    @IsString()
    @IsNotEmpty()
    collegeId: string;

    @IsString()
    @IsNotEmpty()
    universityId: string;

    
}

