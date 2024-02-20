import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { AtStrategy, RtStrategy } from '../strategies';
import { GenerateJwtService } from '../jwt/generate.jwt.service';
import { GenerateJwtModule } from '../jwt/generate.jwt.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [GenerateJwtModule],
  providers: [RegisterService, AtStrategy, RtStrategy, GenerateJwtService, JwtService],
  controllers: [RegisterController]
})
export class RegisterModule { }
