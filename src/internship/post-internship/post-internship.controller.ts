import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PostInternshipService } from './post-internship.service';
import { InternshipFilterDto } from 'src/common/dtos/internship-filter.dto';
import { UpdateInternshipDto } from 'src/common/dtos/create-internship.dto';
import { Role } from 'src/common/constants/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { AtGuard, RoleGuard } from 'src/common/guards';

@Controller('internship')
export class PostInternshipController {
    constructor(
        private postInternshipService: PostInternshipService
    ) {}

    @Get()
    async getAllInternship() {
        return this.postInternshipService.getAllInternship();
    }

    @Get(':id')
    async getInternshipById(@Param('id') _id: string) {
        return this.postInternshipService.getInternshipById(_id);
    }

    @Get('?filter')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR, Role.STUDENT)
    @UseGuards(AtGuard, RoleGuard)
    async getInternships(@Query() filter: InternshipFilterDto){
        const internships = await this.postInternshipService.findMany(filter);

        return internships;
    }

    @Post()
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    async createInternship(@Body() createInternshipDto: any) {
        console.log(createInternshipDto);
        return this.postInternshipService.createInternship(createInternshipDto);
    }

    @Patch(':id')
    async updateInternship(@Body() dto: UpdateInternshipDto, @Param('id') _id: string){
        return this.postInternshipService.updateInternship(dto, _id);
    }

    @Delete(':id')
    async deleteInternship(@Param('id') _id: string) {
        return this.postInternshipService.deleteInternship(_id);
    }

}
