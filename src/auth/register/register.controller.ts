import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { RegisterService } from './register.service';
import { Tokens } from 'src/common/types';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('university')
    @HttpCode(HttpStatus.CREATED)
    registerUniversity(@Body() dto: UniversityRegisterDto): Promise<Tokens> {
        return this.registerService.registerUniversity(dto);
    }
}
