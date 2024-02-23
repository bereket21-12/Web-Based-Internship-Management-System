import { Body, Controller, Post } from '@nestjs/common';
import { SetPermissionService } from './set-permission.service';
import { SetPermissionDto } from 'src/common/dtos';

@Controller('auth/set-permission')
export class SetPermissionController {
    constructor(private setPermissionService: SetPermissionService) {}

    @Post()
    async setPermission(@Body() dto: SetPermissionDto[]) {
        const roleIds = await this.setPermissionService.setPermission(dto);
        return roleIds;
    }
}
