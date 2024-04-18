import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RegisterService } from './register.service';
import { Tokens } from 'src/common/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { collegeRegisterDto } from 'src/common/dtos/college.dto';

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
        @Body() dto: any,
        @UploadedFiles() files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] }
    ): Promise<any> {
        let logoUrl = ' ';
        let logoId = ' ';

        let adminProfilePicUrl = '';
        let imagePublicId = '';

        if (files.image && files.image[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files.image[0]);
            adminProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.adminProfilePicture = adminProfilePicUrl;
        dto.adminImagePublicId = imagePublicId;

        if (files.logo && files.logo[0]) {
            const logoUploadResult = await this.cloudinaryService.uploadImage(files.logo[0]);
            logoUrl = logoUploadResult.url;
            logoId = logoUploadResult.public_id;
        }

        dto.universityLogoUrl = logoUrl
        dto.logoPublicId = logoId
        console.log(dto.adminProfilePicture, dto.adminImagePublicId, 'admin');
        console.log(dto.universityLogoUrl, dto.logoPublicId, 'logo');
        return this.registerService.registerUniversity(dto);
    }


    @Post('department')
    @HttpCode(HttpStatus.CREATED)
   
    async registerDepartmet(
        @Body() dto: any,
    ): Promise<any> {
        return this.registerService.registerDepartment(dto);
 


    }

    @Post('company')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]))
    async registerCompany(
        @Body() dto: any,
        @UploadedFiles() files: { image?: Express.Multer.File[], logo?: Express.Multer.File[] }
    ): Promise<any> {

        let logoUrl = ' '
        let logoId = ' ';

        let hrProfilePicUrl = ' ';
        let imagePublicId = ' ';

        if (files.image && files.image[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files.image[0]);
            hrProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.HRProfilePicture = hrProfilePicUrl;
        dto.HRImagePublicId = imagePublicId;

        if (files.logo && files.logo[0]) {
            const logoUploadResult = await this.cloudinaryService.uploadImage(files.logo[0]);
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
        @Body() dto: any,
        @UploadedFiles() files: { image?: Express.Multer.File[], resume?: Express.Multer.File[] }
    ): Promise<Tokens>
     {
        console.log(files, 'files')
        let studentProfilePicUrl = " ";
        let imagePublicId = " ";

        if (files.image && files.image[0]) {
            const imageUploadResult = await this.cloudinaryService.uploadImage(files.image[0]);
            studentProfilePicUrl = imageUploadResult.url;
            imagePublicId = imageUploadResult.public_id;
        }
        dto.profilePic = studentProfilePicUrl;
        dto.imagePublicId = imagePublicId;

        if (files.resume && files.resume[0]) {
            const resumeUploadPromise = await this.cloudinaryService.uploadPDF(files.resume[0]);
            dto.resumeUrl = resumeUploadPromise.url;
            dto.resumePublicId = resumeUploadPromise.public_id;
            // console.log(resumeUploadPromise.url, resumeUploadPromise.public_id, 'resume')
        }
        return this.registerService.registerStudent(dto);
    }

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('image'))
    // async uploadImage(@UploadedFile() file: Express.Multer.File) {
    //     const imageUploadResult = await this.cloudinaryService.uploadImage(file);
    //     const result = this.cloudinaryService.deleteFile('fxj3vmsktztjnzr9prdf')

    //     return result;
    // }
}
