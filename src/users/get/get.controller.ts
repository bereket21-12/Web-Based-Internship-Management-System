import { Controller, Get } from '@nestjs/common';
import { GetService } from './get.service';

@Controller('get')
export class GetController {
    constructor(
        private getService: GetService
    ) {}

    @Get('all')
    async getAllUsers(): Promise<any> {
        return this.getService.getAllUsers();
    }

    @Get('user/:id')
    async getUserById(_id: string): Promise<any> {
        return this.getService.getUserById(_id);
    }

    @Get('role/:role')
    async getUsersByRole(role: string): Promise<any> {
        return this.getService.getUsersByRole(role);
    }

    @Get('mentor/:id')
    async getMentorsById(_id: string): Promise<any> {
        return this.getService.getMentorsById(_id);
    }

    @Get('advisor/:id')
    async getAdvisorById(_id: string): Promise<any> {
        return this.getService.getAdvisorById(_id);
    }
}
