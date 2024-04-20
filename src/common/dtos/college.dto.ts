import { IsEmail, IsNotEmpty,  IsString, Length } from "class-validator";
export class collegeRegisterDto {
    @IsString()
    @IsNotEmpty()
    Collegename: string;

    @IsString()
    @IsNotEmpty()
    collegeDeanId: string;

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

