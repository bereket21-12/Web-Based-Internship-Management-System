import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';

export class CompanyRegistrationDto {
    @IsString()
    @IsNotEmpty()
    HRUserName: string;

    @IsNotEmpty()
    @IsEmail()
    HREmail: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    HRPassword: string;

    @IsString()
    @IsNotEmpty()
    HRFirstName: string;

    @IsString()
    @IsNotEmpty()
    HRMiddleName: string;

    @IsUrl()
    @IsOptional()
    HRProfilePicture?: string;

    @IsString()
    @IsOptional()
    HRImagePublicId: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    HRPhoneNumber: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsUrl()
    @IsOptional()
    logoUrl: string;

    @IsString()
    @IsOptional()
    logoPublicId: string;

    @IsUrl()
    @IsOptional()
    website?: string;

    @IsEmail()
    @IsNotEmpty()
    companyEmail: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    companyPhoneNum: string;

    @IsString()
    @IsNotEmpty()
    industryType: string;

    @ValidateNested()
    @IsOptional()
    address?: AddressDto;
}
