import { PartialType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CreateQuestionsDto {
    @IsNotEmpty()
    content: string;

    @Transform(({ value }) => parseInt(value)) // Parse to number
    @IsNumber()
    @IsNotEmpty()
    weight: number;
}

export class CreateFormDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    collegeId: string;

    @Transform(({ value }) => parseInt(value)) // Parse to number
    @IsNotEmpty()
    @IsNumber()
    totalWeight: number;

    @IsNotEmpty()
    formType: FormType;

    @IsOptional()
    attachedFileUrl: string;

    @IsOptional()
    attachedFilePublicId: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionsDto)
    questions: CreateQuestionsDto[];

}

export class UpdateFormDto extends PartialType(CreateFormDto) { }

type FormType = 'ADVISOR' | 'MENTOR'