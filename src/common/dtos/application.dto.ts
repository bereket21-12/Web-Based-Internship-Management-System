import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateApplicationDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @IsString()
    internshipId: string;

    @IsNotEmpty()
    status: Status;
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto){}

type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';