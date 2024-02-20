import { Controller, Post } from '@nestjs/common';

@Controller('logout')
export class LogoutController {

    @Post()
    logout() {
        return 'This action logs a user out';
    }
}
