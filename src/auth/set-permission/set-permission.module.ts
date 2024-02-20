import { Module } from '@nestjs/common';
import { SetPermissionService } from './set-permission.service';
import { SetPermissionController } from './set-permission.controller';

@Module({
  providers: [SetPermissionService],
  controllers: [SetPermissionController]
})
export class SetPermissionModule {}
