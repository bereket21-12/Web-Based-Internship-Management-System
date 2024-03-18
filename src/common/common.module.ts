import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AccessControlService } from './access_control/access_control.service';
import { AccessControlModule } from './access_control/access_control.module';

@Module({
  imports: [PrismaModule, AccessControlModule],
  providers: [AccessControlService]
})
export class CommonModule {}
