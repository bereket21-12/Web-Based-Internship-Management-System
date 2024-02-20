import { IsString, IsNotEmpty } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    region: string;

    @IsString()
    subcity?: string;
}