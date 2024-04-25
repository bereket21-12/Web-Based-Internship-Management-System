import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
constructor(
    private universityService: UniversityService,
) {}
    @Get()
    async getUniversities() {
        return this.universityService.getUniversities();
    }

    @Get(':id')
    async getUniversityById(@Param('id') id: string) {
        return this.universityService.getUniversityById(id);
    }

    @Get('uncount/:id')
    async getCountUniversityStaff(@Param('id') id: string) {
        return this.universityService.getCountUniversityById(id);
    }

    @Patch(':id')
    async updateUniversity(@Body() dto, @Param('id') id: string) {
        return this.universityService.updateUniversity(dto, id);
    }

    @Delete(':id')
    async deleteUniversity(@Param('id') id: string) {
        return this.universityService.deleteUniversity(id);
    }
}
