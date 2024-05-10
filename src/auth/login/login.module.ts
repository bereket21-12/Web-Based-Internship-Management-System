import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { GenerateJwtModule } from '../jwt/generate.jwt.module';
import { UniversityModule } from 'src/university/university.module';
import { UniversityService } from 'src/university/university.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [GenerateJwtModule, UniversityModule],
  providers: [LoginService, UniversityService, UsersService],
  controllers: [LoginController],
})
export class LoginModule {}
