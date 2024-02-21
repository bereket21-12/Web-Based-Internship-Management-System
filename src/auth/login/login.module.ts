import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { GenerateJwtModule } from '../jwt/generate.jwt.module';

@Module({
  imports: [GenerateJwtModule],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
