import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from 'src/common/dtos';
@Injectable()
export class HeadService {
  constructor(private prismaService: PrismaService) {}

  async assignAdvisorToStudent(
    studentId: string,
    advisorId: string,
  ): Promise<void> {
    await this.prismaService.student.update({
      where: { id: studentId },
      data: {
        advisor: {
          connect: { id: advisorId },
        },
      },
    });
  }

  async createAdvisor(
    CreateUserDto: CreateUserDto,
    depid: string,
  ): Promise<any> {
    try {
      const hashedPassword = await argon.hash(CreateUserDto.userPassword);
      const user = await this.prismaService.user.create({
        data: {
          firstName: CreateUserDto.firstName,
          middleName: CreateUserDto.middleName,
          userName: CreateUserDto.userName,
          profilePic: CreateUserDto.profilePic,
          imagePublicId: CreateUserDto.profilePicPublicId,
          phoneNum: CreateUserDto.phoneNum,
          verified: false,
          email: CreateUserDto.email,
          password: hashedPassword,
          roleName: 'ADVISOR',
        },
      });

      const advisor = await this.prismaService.advisor.create({
        data: {
          department: {
            connect: { id: depid },
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
      return advisor;
    } catch (error) {
      console.log(error);
    }
  }

  async connectDepartmentToCompany(
    departmentId: string,
    companyId: string,
  ): Promise<any> {
    return this.prismaService.departmentCompany.create({
      data: {
        department: { connect: { id: departmentId } },
        company: { connect: { id: companyId } },
      },
    });
  }

  async removeCompanyFromDepartment(
    departmentId: string,
    companyId: string,
  ): Promise<void> {
    // Check if the DepartmentCompany record exists
    const departmentCompany =
      await this.prismaService.departmentCompany.findFirst({
        where: { departmentId, companyId },
      });

    // If the DepartmentCompany record does not exist, throw a NotFoundException
    if (!departmentCompany) {
      throw new NotFoundException('DepartmentCompany record not found');
    }

    // Delete the DepartmentCompany record
    await this.prismaService.departmentCompany.delete({
      where: { id: departmentCompany.id },
    });
  }

  // async filterAdvisor(_id: string) {
  //   return await this.prismaService.advisor.findMany({
  //     where: {
  //       departmentId: _id,
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  // }
  async filterAdvisor(
    _id: string,
  ): Promise<(any & { studentCount: number })[]> {
    const advisors = await this.prismaService.advisor.findMany({
      where: {
        departmentId: _id,
      },
      include: {
        user: true,
        students: true,
      },
    });

    const advisorsWithStudentCount = advisors.map((advisor) => {
      return {
        ...advisor,
        studentCount: advisor.students.length,
      };
    });

    return advisorsWithStudentCount;
  }

  async getAdvisor(_id: string) {
    return await this.prismaService.advisor.findUnique({
      where: {
        id: _id,
      },
      include: {
        user: true,
      },
    });
  }

  async getCountAdvisor(_id: string) {
    const advisor = await this.prismaService.advisor.findMany({
      where: {
        departmentId: _id,
      },
    });
    return advisor.length;
  }

  async getStudentInDep(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        departmentId: id,
        AND: {
          user: {
            verified: true,
          },
        },
      },
      include: {
        advisor: {
          include: {
            user: true,
          },
        },
        user: true,
        internship: {
          include: {
            company: true,
          },
        },
      },
    });

    return student;
  }

  // async getCountUniversityById(_id: string) {
  //   const count = await this.prismaService.advisor.findMany({
  //     where: {

  //       departmentId: _id,
  //     },
  //     include: {

  //       students: true,
  //     },
  //   });

  //   return [count.students];
  // }

  //to approve std in dep't
  async getStudentInDeptoApprove(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        departmentId: id,
        user: {
          verified: false,
        },
      },
      include: {
        advisor: true,
        user: true,
      },
    });

    return student;
  }
  //approve students
  async approveStudent(id: string) {
    const student = await this.prismaService.student.update({
      where: { id: id },
      data: {
        user: {
          update: { verified: true },
        },
      },
    });

    return student;
  }

  //reject students
  async rejectStudent(id: string) {
    const student = await this.prismaService.student.update({
      where: { id: id },
      data: {
        user: {
          update: { verified: false },
        },
      },
    });

    return student;
  }

  async getDepCompany(_id: string) {
    return await this.prismaService.departmentCompany.findMany({
      where: {
        departmentId: _id,
      },
      select: {
        company: true,
      },
    });
  }
}
