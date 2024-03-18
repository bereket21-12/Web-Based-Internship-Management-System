import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';

@Controller('auth/refresh')
export class RefreshController {
    constructor(private refreshService: RefreshService) {}

    // @Roles(Role.SYSTEM_ADMIN, Role.STUDENT, Role.UNIVERSITY_ADMIN, Role.COLLEGE_DEAN, Role.DEPARTMENT_HEAD, Role.COMPANY_HR, Role.ADVISOR, Role.MENTOR)
    @UseGuards(RtGuard)
    @Post()
    @HttpCode(HttpStatus.OK)
    refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refresh_token') refresh_token: string) {
        console.log('userId', userId, 'refresh_token', refresh_token);
        return this.refreshService.refreshTokens(userId, refresh_token);
    }
}
