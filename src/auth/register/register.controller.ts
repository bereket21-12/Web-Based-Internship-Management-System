import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { RegisterService } from './register.service';
import { Tokens } from 'src/common/types';
import { CompanyRegistrationDto } from 'src/common/dtos/company-register.dto';
import { StudentRegistrationDto } from 'src/common/dtos/student-register.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('auth/register')
export class RegisterController {
    constructor(
        private registerService: RegisterService,
        private cloudinaryService: CloudinaryService
    ) { }

    private static defaultImageUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709011728/yn7txagp9asfmu5uie7f.jpg';
    private static defaultImagePublicId = 'd2lzd65x1idyztuz2afq';

    @Post('university')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]))
    async registerUniversity(
        @Body() dto: UniversityRegisterDto,
        @UploadedFiles() files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] }
    ): Promise<Tokens> {
        let logoUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709102607/d2lzd65x1idyztuz2afq.jpg'
        let logoId = 'd2lzd65x1idyztuz2afq';

        let adminProfilePicUrl = RegisterController.defaultImageUrl;
        let imagePublicId = RegisterController.defaultImagePublicId;

        if (files[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files[0]);
            adminProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.adminProfilePicture = adminProfilePicUrl;
        dto.adminImagePublicId = imagePublicId;

        if (files[1]) {
            const logoUploadResult = await this.cloudinaryService.uploadImage(files[1]);
            logoUrl = logoUploadResult.url;
            logoId = logoUploadResult.public_id;
        }
        dto.universityLogoUrl = logoUrl
        dto.logoPublicId = logoId

        return this.registerService.registerUniversity(dto);
    }

    @Post('company')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]))
    async registerCompany(
        @Body() dto: CompanyRegistrationDto,
        @UploadedFiles() files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] }
    ): Promise<Tokens> {

        let logoUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709102607/d2lzd65x1idyztuz2afq.jpg'
        let logoId = 'd2lzd65x1idyztuz2afq';

        let hrProfilePicUrl = RegisterController.defaultImageUrl;
        let imagePublicId = RegisterController.defaultImagePublicId;

        if (files[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files[0]);
            hrProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.HRProfilePicture = hrProfilePicUrl;
        dto.logoPublicId = imagePublicId;

        if (files[1]) {
            const logoUploadResult = await this.cloudinaryService.uploadImage(files[1]);
            logoUrl = logoUploadResult.url;
            logoId = logoUploadResult.public_id;
        }
        dto.logoUrl = logoUrl
        dto.logoPublicId = logoId
        return this.registerService.registerCompany(dto);
    }

    @Post('student')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'resume', maxCount: 1 }
    ]))
    async registerStudent(
        @Body() dto: StudentRegistrationDto,
        @UploadedFiles() files: { image?: Express.Multer.File[], resume?: Express.Multer.File[] }
    ): Promise<Tokens> {
        let studentProfilePicUrl = RegisterController.defaultImageUrl;
        let imagePublicId = RegisterController.defaultImagePublicId;

        if (files[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files[0]);
            studentProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.profilePic = studentProfilePicUrl;
        dto.imagePublicId = imagePublicId;

        if (files[1]) {
            const resumeUploadPromise = await this.cloudinaryService.uploadPDF(files[1]);
            dto.resumeUrl = resumeUploadPromise.url;
            dto.resumePublicId = resumeUploadPromise.public_id;
        }

        return this.registerService.registerStudent(dto);
    }
}
