import { Body, Controller, Get, Post } from '@nestjs/common';
import { SetPermissionService } from './set-permission.service';
import { SetPermissionDto } from 'src/common/dtos';

@Controller('auth/roles')
export class SetPermissionController {
    constructor(private setPermissionService: SetPermissionService) {}

    @Post()
    async setRoles(@Body() dto: SetPermissionDto[]) {
        const roleIds = await this.setPermissionService.setPermission(dto);
        return roleIds;
    }

    @Get()
    async getRoles() {
        const roles = await this.setPermissionService.getRoles();
        return roles;
    }
}
