import { Module } from '@nestjs/common';
import { FormGenerateService } from './form-generate.service';
import { FormGenerateController } from './form-generate.controller';

@Module({
  providers: [FormGenerateService],
  controllers: [FormGenerateController]
})
export class FormGenerateModule {}
