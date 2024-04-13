import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  phoneNum: string;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  userName: string;

  @IsString()
  @IsOptional()
  profilePic: string;

  @IsString()
  @IsOptional()
  profilePicPublicId: string;

  @IsString()
  userPassword: string;

  @IsBoolean()
  @IsOptional()
  userVerified: boolean = true;

  @IsString()
  @IsOptional()
  roleName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }