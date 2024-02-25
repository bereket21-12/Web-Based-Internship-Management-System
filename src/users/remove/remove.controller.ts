import { Controller, Delete } from '@nestjs/common';
import { RemoveService } from './remove.service';

@Controller('remove')
export class RemoveController {
    constructor(
        private removeService: RemoveService
    ) {}

    @Delete('mentor/:id')
    async removeMentor(_id: string): Promise<any> {
        return this.removeService.removeMentor(_id);
    }

    @Delete('advisor/:id')
    async removeAdvisor(_id: string): Promise<any> {
        return this.removeService.removeAdvisor(_id);
    }

    @Delete('college/:id')
    async removeCollege(_id: string): Promise<any> {
        return this.removeService.removeCollege(_id);
    }

    @Delete('department/:id')
    async removeDepartmentHead(_id: string): Promise<any> {
        return this.removeService.removeDepartmentHead(_id);
    }
    
}
