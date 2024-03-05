import { Module } from '@nestjs/common';
import { AssignService } from './assign.service';
import { AssignController } from './assign.controller';

@Module({
  providers: [AssignService],
  controllers: [AssignController]
})
export class AssignModule {}
