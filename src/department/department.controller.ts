import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(
        private departmentService: DepartmentService,
    ) { }

    @Get()
    async getDepartments() {
        return await this.departmentService.getDepartments();
    }

    @Get(':id')
    async getDepartmentById(@Param('id') id: string) {
        return await this.departmentService.getDepartmentById(id);
    }

    @Patch(':id')
    async updateDepartment(@Body() dto, @Param('id') id: string) {
        return await this.departmentService.updateDepartment(dto, id);
    }

    @Delete(':id')
    async deleteDepartment(@Param('id') id: string) {
        return await this.departmentService.deleteDepartment(id);
    }
}
