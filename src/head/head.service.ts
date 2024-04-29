import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Injectable()
export class HeadService {
  constructor(private prismaService: PrismaService) {}

  async assignAdvisorToStudent(
    studentId: string,
    advisorId: string,
  ): Promise<void> {
    await this.prismaService.student.update({
      where: { id: studentId },
      data: { advisorId },
    });
  }
}
