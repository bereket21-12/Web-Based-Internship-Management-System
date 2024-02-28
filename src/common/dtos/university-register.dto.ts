import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";
import { AddressDto } from "./address.dto";

export class UniversityRegisterDto {
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
    @IsOptional()
    adminProfilePicture?: string;

    @IsString()
    @IsOptional()
    adminImagePublicId: string;

    @IsString()
    @IsOptional()
    logoPublicId: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    adminPhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    universityName: string;

    @IsString()
    websiteUrl?: string;

    @IsNotEmpty()
    @IsEmail()
    universityEmail: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    universityPhoneNumber: string;

    @IsNotEmpty()
    address: AddressDto;

    @IsUrl()
    universityLogoUrl?: string;
}

