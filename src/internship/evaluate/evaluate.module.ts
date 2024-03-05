import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';

@Module({
  providers: [EvaluateService],
  controllers: [EvaluateController]
})
export class EvaluateModule {}
