import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
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

  async createAdvisor(dto: any): Promise<void> {
    try {
      const hashedPassword = await argon.hash(dto.adminPassword);
      const user = await this.prismaService.user.create({
        data: {
          userName: dto.adminUserName,
          email: dto.adminEmail,
          password: hashedPassword,
          firstName: dto.adminFirstName,
          middleName: dto.adminMiddleName,
          profilePic: dto.adminProfilePicture,
          imagePublicId: dto.adminImagePublicId,
          phoneNum: dto.adminPhoneNumber,
          roleName: 'ADVISOR',
          notifications: dto.adminNotifications,
          conversationIds: dto.adminConversationIds,
        },
      });

      await this.prismaService.advisor.create({
        data: {
          department: {
            connect: { id: user.id },
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
