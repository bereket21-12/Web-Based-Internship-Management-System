import { Body, Controller, Post } from '@nestjs/common';
import { AssignService } from './assign.service';
import { CreateAssignDto } from 'src/common/dtos';

@Controller('assign')
export class AssignController {
    constructor(
        private assignService: AssignService
    ) { }

    @Post('mentor')
    async assignMentor(@Body() dto: CreateAssignDto) {
        const student = await this.assignService.assignMentor(dto);
        return student;
    }

    @Post('advisor')
    async assignAdvisor(@Body() dto: CreateAssignDto) {
        const student = await this.assignService.assignAdvisor(dto);
        return student;
    }
}
