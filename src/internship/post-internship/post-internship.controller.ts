import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostInternshipService } from './post-internship.service';

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


    @Post()
    async createInternship() {
        return 'createInternship';
    }

    @Patch()
    async updateInternship() {
        return 'updateInternship';
    }

    @Delete()
    async deleteInternship() {
        return 'deleteInternship';
    }

}
