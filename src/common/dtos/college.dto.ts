import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { AddressDto } from "./address.dto";

// name          String       @unique
// departments   Department[]
// collegeDeanId String       @db.ObjectId
// collegeDean   User         @relation(fields: [collegeDeanId], references: [id])
// universityId  String       @db.ObjectId
// university    University   @relation(fields: [universityId], references: [id])
// email         String
// phoneNum      String
// createdAt     DateTime     @default(now())
// updatedAt     DateTime     @updatedAt
// Form          Form[]

export class collegeRegisterDto {
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
    universityId: string;

    
}

