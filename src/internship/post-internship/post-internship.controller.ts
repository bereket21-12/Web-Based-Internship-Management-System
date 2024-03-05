import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PostInternshipService } from './post-internship.service';
import { InternshipFilterDto } from 'src/common/dtos/internship-filter.dto';
import { CreateInternship, UpdateInternship } from 'src/common/dtos/create-internship.dto';

@Controller('post-internship')
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

    @Get()
    async getInternships(@Query() filter: InternshipFilterDto){
        const internships = await this.postInternshipService.findMany(filter);

        return internships;
    }

    @Post()
    async createInternship(@Body() createInternshipDto: CreateInternship) {
        return this.postInternshipService.createInternship(createInternshipDto);
    }

    @Patch(':id')
    async updateInternship(dto: UpdateInternship, @Param('id') _id: string){
        return this.postInternshipService.updateInternship(dto, _id);
    }

    @Delete(':id')
    async deleteInternship(@Body() dto: CreateInternship, @Param('id') _id: string) {
        return this.postInternshipService.deleteInternship(dto, _id);
    }

}
