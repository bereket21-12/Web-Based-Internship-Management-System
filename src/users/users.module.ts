import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { PrismaService } from 'src/prisma/prisma.service';
import { CreateModule } from './create/create.module';
import { RemoveModule } from './remove/remove.module';
import { EditModule } from './edit/edit.module';
import { GetModule } from './get/get.module';

@Module({
  imports: [PrismaModule, CreateModule, RemoveModule, EditModule, GetModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
