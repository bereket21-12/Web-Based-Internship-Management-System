import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async getAllStudents() {
    const students = await this.prismaService.student.findMany({
      include: {
        advisor: true,
        department: true,
        user: true,
      },
    });
  }
  async getStudentInUniversity(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        universityId: id,
      },
      include: {
        advisor: true,
        department: true,
        user: true,
      },
    });

    return student;
  }

  async getStudentInDep(id: string) {
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

  async getCountStudentInDep(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        departmentId: id,
        user: {
          verified: true,
        },
      },
    });

    return student?.length;
  }

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

  async getCountStudentInDeptoApprove(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        departmentId: id,
        user: {
          verified: false,
        },
      },
    });

    return student.length;
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

  async evaluateStudentByMentor(id: string, point: string) {
    const student = await this.prismaService.student.update({
      where: { id: id },
      data: {
        AdvisorPoint: point,
      },
    });

    return student;
  }

  async evaluateStudentbyAdvisor(id: string, point: string) {
    const student = await this.prismaService.student.update({
      where: { id: id },
      data: {
        MentorePoint: point,
      },
    });

    return student;
  }

  //get student by advisor id with there report
  async getAdvisorStudent(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        advisorId: id,
      },
      include: {
        user: true,
        Report: true,
        advisor: true,
      },
    });

    return student;
  }
  //number of students assigned to advisor
  async getCountAdvisorStudent(id: string) {
    const student = await this.prismaService.student.findMany({
      where: {
        advisorId: id,
      },
    });

    return student.length;
  }

  //approve students
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
}
