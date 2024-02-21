import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('refresh')
export class RefreshController {
    constructor(private refreshService: RefreshService) {}

    @UseGuards(RtGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUser('refresh_token') refresh_token: string, @GetCurrentUserId() userId: string) {
        return this.refreshService.refreshTokens(userId, refresh_token);
    }
}
