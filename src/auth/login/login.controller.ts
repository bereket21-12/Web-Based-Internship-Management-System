import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from 'src/common/dtos';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) {}

    @Post()
    login(@Body() dto: LoginDto) {
        return this.loginService.login(dto);
    }
}
