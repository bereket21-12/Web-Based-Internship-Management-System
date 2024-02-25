import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdvisorDto, CreateCollegeDto, CreateDepartmentHeadDto, CreateMentorDto } from 'src/common/dtos';
import { CreateService } from './create.service';

@Controller('create')
export class CreateController {
    constructor(
        private createService: CreateService,
    ) {}
    @Post('mentor')
    createMentor(@Body() dto: CreateMentorDto) {
        return this.createService.createMentor(dto);
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
}
