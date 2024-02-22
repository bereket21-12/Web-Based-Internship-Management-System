import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('auth/logout')
export class LogoutController {
    constructor(private logoutService: LogoutService) {}

    @UseGuards(AtGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') userId: string){
        return this.logoutService.logout(userId);
    }
}
