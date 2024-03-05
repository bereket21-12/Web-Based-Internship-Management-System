import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { CreateApplicationDto } from 'src/common/dtos';

@Controller('apply')
export class ApplyController {
    constructor(
        private applyService: ApplyService
    ) {}
    
    @Get()
    async getApplications() {
        return this.applyService.getApplications();
    }

    @Get(':id')
    async getApplicationById(id: string) {
        return this.applyService.getApplicationById(id);
    }

    @Post()
    async createApplication(@Body() dto: CreateApplicationDto) {
        return await this.applyService.createApplication(dto);
    }

    @Patch(':id')
    async updateApplication(@Body() dto: CreateApplicationDto, id: string) {
        return await this.applyService.updateApplication(id, dto);
    }

    @Delete(':id')
    async deleteApplication(id: string) {
        return await this.applyService.deleteApplication(id);
    }
}
