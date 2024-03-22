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

    @IsOptional()
    responseA?: string; 

    @IsOptional()
    response?: number; 
}

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}