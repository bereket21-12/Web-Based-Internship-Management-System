import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { RegisterService } from './register.service';
import { Tokens } from 'src/common/types';
import { CompanyRegistrationDto } from 'src/common/dtos/company-register.dto';
import { StudentRegistrationDto } from 'src/common/dtos/student-register.dto';

@Controller('auth/register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('university')
    @HttpCode(HttpStatus.CREATED)
    registerUniversity(@Body() dto: UniversityRegisterDto): Promise<Tokens> {
        return this.registerService.registerUniversity(dto);
    }

    @Post('company')
    @HttpCode(HttpStatus.CREATED)
    registerCompany(@Body() dto: CompanyRegistrationDto): Promise<Tokens> {
        return this.registerService.registerCompany(dto);
    }

    @Post('student')
    @HttpCode(HttpStatus.CREATED)
    registerStudent(@Body() dto: StudentRegistrationDto): Promise<Tokens> {
        return this.registerService.registerStudent(dto);
    }
}
