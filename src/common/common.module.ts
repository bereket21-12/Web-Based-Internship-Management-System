import { Module } from '@nestjs/common';
import { GuardsModule } from './guards/guards.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GuardsModule, PrismaModule]
})
export class CommonModule {}
