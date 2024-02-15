import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CreateModule } from './create/create.module';
import { RemoveModule } from './remove/remove.module';
import { EditModule } from './edit/edit.module';
import { GetModule } from './get/get.module';

@Module({
  imports: [PrismaModule, CreateModule, RemoveModule, EditModule, GetModule],
  controllers: [],
  providers: [],
})
export class UsersModule { }
