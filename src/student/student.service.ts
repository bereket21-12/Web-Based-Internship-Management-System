import { Injectable } from '@nestjs/common';
import { CreateReportDto } from 'src/common/dtos/report.dto';
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

  //get internship opportunities
  async getInternshipOpportunity(id: string) {
    const internOpp = await this.prismaService.departmentCompany.findMany({
      where: { departmentId: id },
      include: {
        company: {
          include: {
            internshipOffered: true,
          },
        },
      },
    });

    return internOpp;
  }

  //get applications with there status apply by student
  async getApplicationSubmitted(id: string) {
    const applicaions = await this.prismaService.student.findMany({
      where: { id: id },
      include: {
        Application: {
          include: {
            company: true,
            internship: true,
          },
        },
      },
    });

    return applicaions;
  }

  //get accepted applications
  async getAcceptedApplication(id: string) {
    const applicaions = await this.prismaService.student.findMany({
      where: { id: id },
      include: {
        Application: {
          where: {
            status: 'ACCEPTED',
          },
          include: {
            company: true,
            internship: true,
          },
        },
      },
    });

    return applicaions;
  }

  //get internship by id
  async getInternshipById(id: string) {
    const internship = await this.prismaService.internship.findMany({
      where: { id: id },
      include: {
        description: true,
      },
    });

    return internship;
  }

  //get student's internship by id
  async getStudentsInternShip(id: string) {
    const internship = await this.prismaService.student.findMany({
      where: { userId: id },
      include: {
        internship: {
          include: {
            company: true,
            Application: true,
            description: true,
          },
        },
      },
    });

    return internship;
  }

  //get my mentor and advisor
  async getMentoreandAdvisor(id: string) {
    const advMen = await this.prismaService.student.findMany({
      where: { userId: id },
      include: {
        advisor: {
          include: {
            user: true,
          },
        },
        mentor: {
          include: {
            user: true,
          },
        },
      },
    });

    return advMen;
  }

  async registerCompany(dto: CreateReportDto) {
    try {
      const report = await this.prismaService.report.create({
        data: {
          studentId: dto.studentId,
          advisorId: dto.advisorId,
          mentorId: dto.mentorId,
          internshipId: dto.internshipId,
          title: dto.title,
          description: dto.description,
          attachmentUrl: dto.attachmentUrl,
          challengesFaced: { set: dto.challengesFaced },
          lessonsLearned: { set: dto.lessonsLearned },
          tasksAccomplished: { set: dto.tasksAccomplished },
          feedbackId: dto.feedbackId,
        },
      });

      return report;
    } catch (error) {
      // Handle error
      throw new Error('Failed to register report.');
    }
  }
}
