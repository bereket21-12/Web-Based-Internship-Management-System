import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';

@Module({
  providers: [ApplyService],
  controllers: [ApplyController]
})
export class ApplyModule {}
