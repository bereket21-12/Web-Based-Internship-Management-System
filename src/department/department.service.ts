import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private prismaService: PrismaService) {}

  async getDepartments() {
    const departments = await this.prismaService.department.findMany({
      include: {
        departmentHead: true,
      },
    });
    return departments;
  }

  async getDepartmentById(_id: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: _id,
      },
    });

    return department;
  }
  async getDepartmentsByCollegeId(collegeId: string) {
    const departments = await this.prismaService.department.findMany({
      where: {
        collegeId: collegeId,
      },
    });

    return departments;
  }

  async getDepartmentByuniversityId(_id: string | null) {
    const college = await this.prismaService.department.findMany({
      where: {
        universityId: _id,
      },
      include: {
        departmentHead: true,
      },
    });

    return college;
  }

  async getDepartmentByCollegeId(_id: string) {
    const college = await this.prismaService.department.findMany({
      where: {
        collegeId: _id,
      },
    });

    return college;
  }
  async updateDepartment(dto, _id: string) {
    return await this.prismaService.department.update({
      where: {
        id: _id,
      },
      data: dto,
    });
  }

  async deleteDepartment(_id: string) {
    return await this.prismaService.department.delete({
      where: {
        id: _id,
      },
    });
  }
}
