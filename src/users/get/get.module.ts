import { Module } from '@nestjs/common';
import { GetController } from './get.controller';
import { GetService } from './get.service';

@Module({
  controllers: [GetController],
  providers: [GetService]
})
export class GetModule {}
