import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { PrismaService } from './prisma/prisma.service';
import { UsersController } from './users/users.controller';
// import { PrismaModule } from './prisma/prisma.module';
import { PrismaModule } from './prisma/prisma.module';
import { InternshipModule } from './internship/internship.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UsersModule, PrismaModule, InternshipModule, AuthModule, CommonModule],
  controllers: [UsersController],
  providers: [AppService],
})
export class AppModule {}
