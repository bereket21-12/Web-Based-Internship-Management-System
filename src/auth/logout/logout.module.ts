import { Module } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { LogoutController } from './logout.controller';

@Module({
  providers: [LogoutService],
  controllers: [LogoutController]
})
export class LogoutModule {}
