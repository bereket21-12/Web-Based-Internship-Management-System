import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AtStrategy, RtStrategy } from '../strategies';
import { GenerateJwtService } from '../jwt/generate.jwt.service';

@Module({
  providers: [RegisterService, AtStrategy, RtStrategy, GenerateJwtService],
  controllers: [RegisterController]
})
export class RegisterModule { }
