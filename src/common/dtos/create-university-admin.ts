import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class CreateUniversityAdminDto {
    @IsString()
    @IsNotEmpty()
    adminUserName: string;

    @IsNotEmpty()
    @IsEmail()
    adminEmail: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    adminPassword: string;

    @IsString()
    @IsNotEmpty()  
    adminFirstName: string;

    @IsString()
    @IsNotEmpty()
    adminMiddleName: string;

    @IsUrl()
    adminProfilePicture?: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    adminPhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    universityName: string;

    @IsNotEmpty()
    @IsEmail()
    universityEmail: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    universityPhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    universityCityAddress: string;

    @IsString()
    @IsNotEmpty()
    universityRegionAddress: string;

    @IsString()
    universitySubCityAddress?: string;

    @IsUrl()
    universityLogoUrl?: string;
}