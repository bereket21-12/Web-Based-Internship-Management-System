import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Schedule {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    REMOTE = 'REMOTE'
}

export enum Compensations {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}
export class InternshipFilterDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    companyId?: string;

    @IsOptional()
    @IsEnum(Schedule)
    schedule?: Schedule;

    @IsOptional()
    @IsEnum(Compensations)
    compensations?: Compensations;
}
