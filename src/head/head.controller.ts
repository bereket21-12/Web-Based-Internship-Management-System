import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { HeadService } from './head.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('head')
export class HeadController {
  constructor(
    private headSevice: HeadService,
    private cloudinaryService: CloudinaryService,
  ) {}

  private static defaultImageUrl = '';
  private static defaultImagePublicId = '';
  @Get('advisor/:id')
  async getUniversityByUserId(@Param('id') id: string) {
    return this.headSevice.filterAdvisor(id);
  }

  @Get('varified/:id')
  async getvarifiedstudents(@Param('id') id: string) {
    return this.headSevice.getStudentInDep(id);
  }
  @Get('company/:id')
  async getDepComapny(@Param('ID') id: string) {
    return this.headSevice.getDepCompany(id);
  }

  @Get('tovarify/:id')
  async getnotvalidstd(@Param('id') id: string) {
    return this.headSevice.getStudentInDeptoApprove(id);
  }
  @Post(':studentId/assign/:advisorId')
  async assignAdvisorToStudent(
    @Param('studentId') studentId: string,
    @Param('advisorId') advisorId: string,
  ): Promise<void> {
    await this.headSevice.assignAdvisorToStudent(studentId, advisorId);
  }

  @Post('addAdvisor/:id')
  async createAdvisor(
    @Body() user: any,
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: any,
  ) {
    try {
      let deanProfilePic = HeadController.defaultImageUrl;
      let imagePublicId = HeadController.defaultImagePublicId;

      if (image) {
        const imageFile = await this.cloudinaryService
          .uploadImage(image)
          .catch((err) => {
            throw new BadRequestException(
              `Image upload failed: ${err.message}`,
            );
          });
        imagePublicId = imageFile.public_id;
        deanProfilePic = imageFile.url;
      }

      user.profilePic = imagePublicId;
      user.profilePicPublicId = deanProfilePic;
      console.log(id);
      await this.headSevice.createAdvisor(user, id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post('connect/:departmentId/:companyId')
  async connectDepartmentToCompany(
    @Param('departmentId') departmentId: string,
    @Param('companyId') companyId: string,
  ): Promise<void> {
    await this.headSevice.connectDepartmentToCompany(departmentId, companyId);
  }

  @Post(':studentId/approve')
  async approveStudent(@Param('studentId') studentId: string): Promise<void> {
    await this.headSevice.approveStudent(studentId);
  }

  @Post(':studentId/reject')
  async arejectStudent(@Param('studentId') studentId: string): Promise<void> {
    await this.headSevice.rejectStudent(studentId);
  }

  @Delete('disconnect/:departmentId/:companyId')
  async removeCompanyFromDepartment(
    @Param('departmentId') departmentId: string,
    @Param('companyId') companyId: string,
  ): Promise<void> {
    try {
      await this.headSevice.removeCompanyFromDepartment(
        departmentId,
        companyId,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('DepartmentCompany record not found');
      }
      throw error;
    }
  }
}
