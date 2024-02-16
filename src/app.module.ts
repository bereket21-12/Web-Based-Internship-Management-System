import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { InternshipModule } from './internship/internship.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, PrismaModule, InternshipModule, AuthModule, CommonModule, ChatModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
