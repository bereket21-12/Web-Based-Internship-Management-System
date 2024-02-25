import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateAdvisorDto, UpdateCollegeDto, UpdateDepartmentHeadDto, UpdateMentorDto } from 'src/common/dtos';
import { EditService } from './edit.service';

@Controller('edit')
export class EditController {
    constructor(
        private updateService: EditService,
    ) {}

    @Patch('mentor')
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
