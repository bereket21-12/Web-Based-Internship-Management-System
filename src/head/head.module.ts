import { Module } from '@nestjs/common';
import { HeadService } from './head.service';
import { HeadController } from './head.controller';

@Module({
  providers: [HeadService],
  controllers: [HeadController]
})
export class HeadModule {}
