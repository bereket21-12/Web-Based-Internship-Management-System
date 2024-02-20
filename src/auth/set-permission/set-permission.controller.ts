import { Controller, Post } from '@nestjs/common';

@Controller('set-permission')
export class SetPermissionController {

    @Post()
    setPermission() {
        return 'This action sets a permission';
    }
}
