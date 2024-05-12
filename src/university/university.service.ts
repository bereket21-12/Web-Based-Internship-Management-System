import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UniversityService {
  constructor(private prismaService: PrismaService) {}
  async getUniversities() {
    const universities = await this.prismaService.university.findMany({
      include: {
        departments: true,
    
      },
    });

    return universities;
  }

  async getUniversityById(_id: string) {
    const university = await this.prismaService.university.findUnique({
      where: {
        id: _id,
      },
      include: {
        departments: true,
      },
    });

    return university;
  }

  async getCountUniversityById(_id: string) {
    const university = await this.prismaService.university.findUnique({
      where: {
        id: _id,
      },
      include: {
        departments: true,
        college: true,
        students: true,
        universityUsers: true,
      },
    });

    return [
      university.students.length | 0,
      university.departments.length | 0,
      university.college.length | 0,
      university.universityUsers.length | 0,
    ];
  }

  async updateUniversity(dto, _id: string) {
    return await this.prismaService.university.update({
      where: {
        id: _id,
      },
      data: dto,
    });
  }

  async deleteUniversity(_id: string) {
    return await this.prismaService.university.delete({
      where: {
        id: _id,
      },
    });
  }
  async filterUniversityByUserID(_id: string) {
    return await this.prismaService.universityUser.findMany({
      where: {
        userId: _id,
      },
      select: {
        universityId: true,
      },
    });
  }
}
