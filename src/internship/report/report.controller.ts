import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportDto } from 'src/common/dtos/report.dto';

@Controller('report')
export class ReportController {
    constructor(
        private reportService: ReportService
    ) {}

    @Get()
    async getAllReport() {
        return this.reportService.getAllReport();
    }

    @Get(':id')
    async getReportById(@Param('id') _id: string) {
        return this.reportService.getReportById(_id);
    }        

    @Post()
    async createReport(@Body() createReportDto: CreateReportDto){
        return this.reportService.createReport(createReportDto);
    }

    @Patch(':id')
    async updateReport(@Body() updateReportDto: UpdateReportDto, @Param('id') _id: string){
        return this.reportService.updateReport(updateReportDto, _id);
    }

    @Delete(':id')
    async deleteReport(@Param('_id') _id: string){
        return this.reportService.deleteReport(_id);
    }
}
