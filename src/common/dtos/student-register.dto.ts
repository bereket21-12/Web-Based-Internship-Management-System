import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class StudentRegistrationDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    middleName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsUrl()
    @IsOptional()
    profilePic?: string;

    @IsString()
    @IsOptional()
    imagePublicId?: string;

    @IsString()
    @IsNotEmpty()
    phoneNum: string;

    @IsBoolean()
    @IsOptional()
    verified?: boolean;

    @IsString()
    @IsOptional()
    universityName?: string;

    @IsString()
    @IsOptional()
    departmentName?: string;
    
    @IsNumber()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    year: number;

    @IsNumber()
    @Min(1)
    @Max(4)
    @Type(() => Number)
    gpa: number;

    @IsArray()
    @IsString({ each: true })
    skills: string[];

    @IsUrl()
    @IsOptional()
    resumeUrl?: string;

    @IsString()
    @IsOptional()
    resumePublicId?: string;
}
