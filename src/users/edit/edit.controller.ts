import { BadRequestException, Body, Controller, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateAdvisorDto, UpdateCollegeDto, UpdateDepartmentHeadDto, UpdateMentorDto } from 'src/common/dtos';
import { EditService } from './edit.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('edit')
export class EditController {
    constructor(
        private updateService: EditService,
        private cloudinaryService: CloudinaryService
    ) {}

    @Patch('mentor/:id') // Add ':id' to the path to capture mentor ID
    @UseInterceptors(FileInterceptor('image'))
    async updateMentor(
        @Body() dto: UpdateMentorDto,
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File // Add UploadedFile decorator for image
    ) {
        try {
            let mentorProfilePicUrl = ''; // Initialize default URL
            let imagePublicId = ''; // Initialize default public ID

            if (image) {
                // If image is provided, upload it to Cloudinary
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                mentorProfilePicUrl = imageFile.url; // Set URL from Cloudinary response
                imagePublicId = imageFile.public_id; // Set public ID from Cloudinary response
            }

            // Update mentor data with new image details
            dto.mentorImagePublicId = imagePublicId;
            dto.mentorProfilePicUrl = mentorProfilePicUrl;

            // Call update service with mentor ID and updated DTO
            return this.updateService.updateMentor(dto, id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }


    @Patch('advisor/:id') // Add ':id' to the path to capture advisor ID
    @UseInterceptors(FileInterceptor('image'))
    async updateAdvisor(
        @Body() dto: UpdateAdvisorDto,
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File // Add UploadedFile decorator for image
    ) {
        try {
            let advisorProfilePicUrl = ''; // Initialize default URL
            let imagePublicId = ''; // Initialize default public ID

            if (image) {
                // If image is provided, upload it to Cloudinary
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                advisorProfilePicUrl = imageFile.url; // Set URL from Cloudinary response
                imagePublicId = imageFile.public_id; // Set public ID from Cloudinary response
            }

            // Update advisor data with new image details
            dto.advisorImagePublicId = imagePublicId;
            dto.advisorProfilePicUrl = advisorProfilePicUrl;

            // Call update service with advisor ID and updated DTO
            return this.updateService.updateAdvisor(dto, id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }


    @Patch('college/:id') // Add ':id' to the path to capture college ID
    @UseInterceptors(FileInterceptor('image'))
    async updateCollege(
        @Body() dto: UpdateCollegeDto,
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File // Add UploadedFile decorator for image
    ) {
        try {
            let collegeImageUrl = ''; // Initialize default URL
            let imagePublicId = ''; // Initialize default public ID

            if (image) {
                // If image is provided, upload it to Cloudinary
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                collegeImageUrl = imageFile.url; // Set URL from Cloudinary response
                imagePublicId = imageFile.public_id; // Set public ID from Cloudinary response
            }

            // Update college data with new image details
            dto.deanImagePublicId = imagePublicId;
            dto.deanProfilePic = collegeImageUrl;

            // Call update service with college ID and updated DTO
            return this.updateService.updateCollege(dto, id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Patch('department-head/:id') // Add ':id' to the path to capture department head ID
    @UseInterceptors(FileInterceptor('image'))
    async updateDepartmentHead(
        @Body() dto: UpdateDepartmentHeadDto,
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File // Add UploadedFile decorator for image
    ) {
        try {
            let departmentHeadImageUrl = ''; // Initialize default URL
            let imagePublicId = ''; // Initialize default public ID

            if (image) {
                // If image is provided, upload it to Cloudinary
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                departmentHeadImageUrl = imageFile.url; // Set URL from Cloudinary response
                imagePublicId = imageFile.public_id; // Set public ID from Cloudinary response
            }

            // Update department head data with new image details
            dto.departmentHeadImagePublicId = imagePublicId;
            dto.departmentHeadProfilePicUrl = departmentHeadImageUrl;

            // Call update service with department head ID and updated DTO
            return this.updateService.updateDepartmentHead(dto, id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

}
