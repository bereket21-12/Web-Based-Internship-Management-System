import { Body, Controller, Param, Patch, UseInterceptors } from '@nestjs/common';
import { UpdateAdvisorDto, UpdateCollegeDto, UpdateDepartmentHeadDto, UpdateMentorDto } from 'src/common/dtos';
import { EditService } from './edit.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('edit')
export class EditController {
    constructor(
        private updateService: EditService,
    ) {}

    @Patch('mentor')
    @UseInterceptors(FileInterceptor('image'))
    async updateMentor(@Body() dto: UpdateMentorDto, @Param('id') id: string) {
        return await this.updateService.updateMentor(dto, id);
    }

    @Patch('advisor')
    async updateAdvisor(@Body() dto: UpdateAdvisorDto, @Param('id') id: string) {
        return await this.updateService.updateAdvisor(dto, id);
    }

    @Patch('college')
    async updateCollege(@Body() dto: UpdateCollegeDto, @Param('id') id: string) {
        return await this.updateService.updateCollege(dto, id);
    }

    @Patch('department-head')
    async updateDepartmentHead(@Body() dto: UpdateDepartmentHeadDto, @Param('id') id: string) {
        return await this.updateService.updateDepartmentHead(dto, id);
    }
}
