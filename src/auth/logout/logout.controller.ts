import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { AtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/common/constants/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('auth/logout')
export class LogoutController {
    constructor(private logoutService: LogoutService) {}

    @Post()
    @Roles(Role.SYSTEM_ADMIN, Role.STUDENT, Role.UNIVERSITY_ADMIN, Role.COLLEGE_DEAN, Role.DEPARTMENT_HEAD, Role.COMPANY_HR, Role.ADVISOR, Role.MENTOR)
    @UseGuards(AtGuard, RoleGuard)
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUser('sub') userId: string){
        return this.logoutService.logout(userId);
    }
}
