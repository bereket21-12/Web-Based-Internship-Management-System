import { Module } from '@nestjs/common';
import { GuardsModule } from './guards/guards.module';

@Module({
  imports: [GuardsModule]
})
export class CommonModule {}
