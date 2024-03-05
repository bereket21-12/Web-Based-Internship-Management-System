import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAssignDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @IsOptional()
    mentorId?: string;

    @IsOptional()
    advisorId?: string;
}