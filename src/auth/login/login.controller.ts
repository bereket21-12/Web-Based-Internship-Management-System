import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from 'src/common/dtos';
import { Tokens } from 'src/common/types';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto): Promise<Tokens> {
        return this.loginService.login(dto);
    }
}
