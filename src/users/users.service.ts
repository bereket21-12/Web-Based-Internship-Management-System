import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.prismaService.user.create({
      data: createUserDto,
    })
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany()
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id: id }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {id},
    })
  }
}
