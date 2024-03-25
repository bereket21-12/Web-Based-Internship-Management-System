import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { InternshipModule } from './internship/internship.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MessageModule } from './message/message.module';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message/message.service';
import { SocketGateway } from './gateway/gateway';
import { AccessControlService } from './common/access_control/access_control.service';


@Module({
  imports: [UsersModule, PrismaModule, InternshipModule, AuthModule, CommonModule, ChatModule, CloudinaryModule,MessageModule,SocketGateway],
  controllers: [],
  providers: [MessageService, AccessControlService],
})
export class AppModule { }
