import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { RegisterModule } from './register/register.module';
import { SetPermissionModule } from './set-permission/set-permission.module';

@Module({
  imports: [LoginModule, LogoutModule, RegisterModule, SetPermissionModule],
})
export class AuthModule {}
