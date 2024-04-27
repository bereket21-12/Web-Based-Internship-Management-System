import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { GenerateJwtModule } from '../jwt/generate.jwt.module';
import { UniversityModule } from 'src/university/university.module';
import { UniversityService } from 'src/university/university.service';

@Module({
  imports: [GenerateJwtModule, UniversityModule],
  providers: [LoginService, UniversityService],
  controllers: [LoginController],
})
export class LoginModule {}
