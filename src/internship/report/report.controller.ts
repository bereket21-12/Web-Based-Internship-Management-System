import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportDto } from 'src/common/dtos/report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('report')
export class ReportController {
  constructor(
    private reportService: ReportService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getAllReport() {
    return this.reportService.getAllReport();
  }

  @Get(':id')
  async getReportById(@Param('id') _id: string) {
    return this.reportService.getReportById(_id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createReport(
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let attachmentUrl = ' ';
      let attachmentUrlPublicId = ' ';
      if (file) {
        const fileURL = await this.cloudinaryService
          .uploadPDF(file)
          .catch((err) => {
            throw new BadRequestException(
              `Image upload failed: ${err.message}`,
            );
          });
        attachmentUrl = fileURL.url;
        attachmentUrlPublicId = fileURL.public_id;
      }

      dto.attachmentUrl = attachmentUrl;
      // dto.mentorProfilePicUrl = attachmentUrlPublicId;
      console.log(attachmentUrlPublicId);
      return this.reportService.createReport(dto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async updateReport(
    @Body() updateReportDto: UpdateReportDto,
    @Param('id') _id: string,
  ) {
    return this.reportService.updateReport(updateReportDto, _id);
  }

  @Delete(':id')
  async deleteReport(@Param('_id') _id: string) {
    return this.reportService.deleteReport(_id);
  }
}
