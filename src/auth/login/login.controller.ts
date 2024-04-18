import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { Tokens } from 'src/common/types';

@Controller('auth/login')
export class LoginController {
    constructor(private loginService: LoginService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: any): Promise<Tokens>{
        console.log('LoginController.login', dto)
        return this.loginService.login(dto);
    }
}
