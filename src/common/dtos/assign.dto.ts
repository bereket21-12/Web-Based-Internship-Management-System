import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssignDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;
    mentorId: string;
    advisorId: string;
}