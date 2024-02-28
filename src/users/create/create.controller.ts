import { BadRequestException, Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateAdvisorDto, CreateCollegeDto, CreateDepartmentHeadDto, CreateMentorDto } from 'src/common/dtos';
import { CreateService } from './create.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('create')
export class CreateController {
    constructor(
        private createService: CreateService,
        private cloudinaryService: CloudinaryService
    ) { }

    private static defaultImageUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709011728/yn7txagp9asfmu5uie7f.jpg';
    private static defaultImagePublicId = 'd2lzd65x1idyztuz2afq'

    @Post('mentor')
    @UseInterceptors(FileInterceptor('image'))
    async createMentor(@Body() dto: CreateMentorDto, @UploadedFile() image: Express.Multer.File) {
        try {
            let mentorProfilePicUrl = CreateController.defaultImageUrl;
            let imagePublicId = CreateController.defaultImagePublicId;
            if (image) {
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                mentorProfilePicUrl = imageFile.url;
                imagePublicId = imageFile.public_id;
            }

            dto.mentorImagePublicId = imagePublicId;
            dto.mentorProfilePicUrl = mentorProfilePicUrl;
            return this.createService.createMentor(dto);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Post('advisor')
    @UseInterceptors(FileInterceptor('image'))
    async createAdvisor(@Body() dto: CreateAdvisorDto, @UploadedFile() image: Express.Multer.File) {
        try {
            let advisorProfilePicUrl = CreateController.defaultImageUrl;
            let imagePublicId = CreateController.defaultImagePublicId;

            if (image) {
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                advisorProfilePicUrl = imageFile.url;
                imagePublicId = imageFile.public_id;
            }
            dto.advisorImagePublicId = imagePublicId;
            dto.advisorProfilePicUrl = advisorProfilePicUrl;
            return this.createService.createAdvisor(dto);
        } catch (err) {
            throw new Error(err);
        }
    }

    @Post('department-head')
    @UseInterceptors(FileInterceptor('image'))
    async createDepartmentHead(@Body() dto: CreateDepartmentHeadDto, @UploadedFile() image: Express.Multer.File) {
        try {
            let departmentHeadProfilePicUrl = CreateController.defaultImageUrl;
            let imagePublicId = CreateController.defaultImagePublicId;

            if (image) {
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                departmentHeadProfilePicUrl = imageFile.url;
                imagePublicId = imageFile.public_id;
            }

            dto.departmentHeadImagePublicId = imagePublicId;
            dto.departmentHeadProfilePicUrl = departmentHeadProfilePicUrl;
            return this.createService.createDepartmentHead(dto);
        } catch (err) {
            throw new Error(err);
        }
    }

    @Post('college')
    @UseInterceptors(FileInterceptor('image'))
    async createCollege(@Body() dto: CreateCollegeDto, @UploadedFile() image: Express.Multer.File) {
        try {
            let deanProfilePic = CreateController.defaultImageUrl;
            let imagePublicId = CreateController.defaultImagePublicId;

            if (image) {
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                imagePublicId = imageFile.public_id;
                deanProfilePic = imageFile.url;
            }

            dto.deanImagePublicId = imagePublicId;
            dto.deanProfilePic = deanProfilePic;
            return this.createService.createCollege(dto);
        } catch (err) {
            throw new Error(err);
        }
    }

    @Post('upload')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'resume', maxCount: 1 }
    ]))
    async uploadFiles(@UploadedFiles() files: { image?: Express.Multer.File[], resume?: Express.Multer.File[] }) {
        // Safely extract the first (and only) image file if present, else undefined
        const imageFile = files.image && files.image.length > 0 ? files.image[0] : undefined;
        // Safely extract the first (and only) resume file if present, else undefined
        const resumeFile = files.resume && files.resume.length > 0 ? files.resume[0] : undefined;

        const uploadResults = await this.createService.uploadProfilePicAndResume(imageFile, resumeFile);
        return uploadResults; // Or handle as needed, perhaps returning URLs or statuses of both uploads
    }
}
