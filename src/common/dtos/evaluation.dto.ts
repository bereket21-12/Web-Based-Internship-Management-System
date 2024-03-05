import { IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEvaluationDto {
    @IsNotEmpty()
    studentId: string;

    @IsOptional()
    mentorId?: string;

    @IsOptional()
    advisorId?: string;

    @IsNotEmpty()
    formId: string;

    @IsNotEmpty()
    evaluationDate: Date;

    // Additional properties for storing responses based on question types (see next step)
    @IsOptional()
    responseA?: string; // Adjust type based on question type

    @IsOptional()
    response?: number; // Adjust type based on question type

    // ... Add additional response properties as needed
}

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}