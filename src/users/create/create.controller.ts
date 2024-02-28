import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateAdvisorDto, CreateCollegeDto, CreateDepartmentHeadDto, CreateMentorDto } from 'src/common/dtos';
import { CreateService } from './create.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('create')
export class CreateController {
    constructor(
        private createService: CreateService,
        private cloudinaryService: CloudinaryService
    ) {}
    @Post('mentor')
    @UseInterceptors(FileInterceptor('image'))
    async createMentor(@Body() dto: CreateMentorDto, @UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.uploadImageToCloudinary(file)
            console.log(result.secure_url)
            dto.mentorProfilePicUrl = result.secure_url;
            return this.createService.createMentor(dto);
        } catch(err) {
            throw new Error(err);
        }
    }

    @Post('advisor')
    createAdvisor(@Body() dto: CreateAdvisorDto) {
        return this.createService.createAdvisor(dto);
    }

    @Post('department-head')
    createDepartmentHead(@Body() dto: CreateDepartmentHeadDto) {
        return this.createService.createDepartmentHead(dto);
    }

    @Post('college')
    createCollege(@Body() dto: CreateCollegeDto) {
        return this.createService.createCollege(dto);
    }

    @Post('upload')
    async uploadImageToCloudinary(file: Express.Multer.File) {
        return await this.cloudinaryService.uploadImage(file).catch(err => {
            throw new BadRequestException(err);
        })
    }
}
