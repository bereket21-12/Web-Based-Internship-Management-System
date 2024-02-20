import { Body, Controller, Post } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { RegisterService } from './register.service';
import { Tokens } from 'src/common/types';

@Controller('register')
export class RegisterController {
    constructor(private registerService: RegisterService) { }

    @Post('university')
    registerUniversity(@Body() dto: UniversityRegisterDto): Promise<Tokens> {
        return this.registerService.registerUniversity(dto);
    }
}
