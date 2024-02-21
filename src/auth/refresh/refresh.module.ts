import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { RefreshController } from './refresh.controller';

@Module({
  providers: [RefreshService],
  controllers: [RefreshController]
})
export class RefreshModule {}
