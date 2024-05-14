import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(
    private prismaService: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getAllReport() {
    return await this.prismaService.report.findMany();
  }

  async getReportById(_id: string) {
    return await this.prismaService.report.findUnique({
      where: {
        id: _id,
      },
    });
  }

  async getReportByAdvisorId(_id: string) {
    return await this.prismaService.report.findMany({
      where: {
        advisorId: _id,
      },
    });
  }

  async createReport(dto) {
    const newReport = this.prismaService.report.create({
      data: dto,
    });

    return newReport;
  }

  async updateReport(dto, _id: string) {
    const { attachmentUrl, ...data } = dto;
    if (attachmentUrl) {
      const { secure_url } = await this.cloudinary.uploadPDF(attachmentUrl);
      data.attachmentUrl = secure_url;
    }
    return await this.prismaService.report.update({
      where: {
        id: _id,
      },
      data,
    });
  }

  async deleteReport(_id: string) {
    return await this.prismaService.report.delete({
      where: {
        id: _id,
      },
    });
  }
}
