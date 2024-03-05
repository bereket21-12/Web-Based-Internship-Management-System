import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

export class CreateQuestionsDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;
}

export class CreateFormDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    collegeId: string;

    @IsNotEmpty()
    @IsNumber()
    totalWeight: number;

    @IsNotEmpty()
    formType: FormType;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionsDto)
    questions: CreateQuestionsDto[];

}

export class UpdateFormDto extends PartialType(CreateFormDto) {}

type FormType = 'ADVISOR' | 'MENTOR'