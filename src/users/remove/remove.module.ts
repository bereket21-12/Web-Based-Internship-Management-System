import { Module } from '@nestjs/common';
import { RemoveService } from './remove.service';
import { RemoveController } from './remove.controller';

@Module({
  providers: [RemoveService],
  controllers: [RemoveController]
})
export class RemoveModule {}
