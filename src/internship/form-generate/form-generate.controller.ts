import { Body, Controller, Delete, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FormGenerateService } from './form-generate.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateFormDto, UpdateFormDto } from 'src/common/dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('form-generate')
export class FormGenerateController {
    constructor(
        private formGenerateService: FormGenerateService,
        private cloudinaryService: CloudinaryService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createForm(
        @Body() dto: CreateFormDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        let attachedFileUrl = '';
        let attachedFilePublicId = '';

        if (file) {
            const uploadResult = await this.cloudinaryService.uploadPDF(file);
            attachedFileUrl = uploadResult.url;
            attachedFilePublicId = uploadResult.public_id;
        }

        dto.attachedFileUrl = attachedFileUrl;
        dto.attachedFilePublicId = attachedFilePublicId;

        return this.formGenerateService.createForm(dto);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateForm(
        @Param('id') id: string,
        @Body() dto: UpdateFormDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        let attachedFileUrl = '';
        let attachedFilePublicId = '';

        if (file) {
            const uploadResult = await this.cloudinaryService.uploadPDF(file);
            attachedFileUrl = uploadResult.url;
            attachedFilePublicId = uploadResult.public_id;
        }

        dto.attachedFileUrl = attachedFileUrl;
        dto.attachedFilePublicId = attachedFilePublicId;

        return this.formGenerateService.updateForm(id, dto);
    }

    @Delete(':id')
    async deleteForm(
        @Param('id') id: string
    ) {
        return this.formGenerateService.deleteForm(id);
    }

}
