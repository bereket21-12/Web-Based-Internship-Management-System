import { Controller, Get, Param } from '@nestjs/common';
import { GetService } from './get.service';

@Controller('users')
export class GetController {
    constructor(
        private getService: GetService
    ) { }

    @Get()
    async getAllUsers(): Promise<any> {
        return this.getService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') _id: string): Promise<any> {
        return this.getService.getUserById(_id);
    }

    @Get('role/:role')
    async getUsersByRole(@Param('role') role: string): Promise<any> {
        return this.getService.getUsersByRole(role);
    }

    @Get('mentor/:id')
    async getMentorsById(@Param('id') _id: string): Promise<any> {
        return this.getService.getMentorsById(_id);
    }

    @Get('advisor/:id')
    async getAdvisorById(@Param('id') _id: string): Promise<any> {
        return this.getService.getAdvisorById(_id);
    }
}
