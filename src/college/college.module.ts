import { Module } from '@nestjs/common';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';

@Module({
  providers: [CollegeService],
  controllers: [CollegeController]
})
export class CollegeModule {}
