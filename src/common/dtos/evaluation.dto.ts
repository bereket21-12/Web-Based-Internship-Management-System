import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsString()
    studentId: string;

    @Transform(({ value }) => value ? value : null)
    @IsOptional()
    @IsString()
    mentorId?: string;

    @IsOptional()
    @IsString()
    advisorId?: string;

    @IsNotEmpty()
    @IsString()
    formId: string;

    @IsNotEmpty()
    evaluationDate: Date;

    @IsOptional()
    responseA?: string; 

    @IsOptional()
    response?: number; 
}

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}