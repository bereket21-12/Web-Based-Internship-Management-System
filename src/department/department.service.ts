import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class DepartmentService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getDepartments() {
        const departments = await this.prismaService.department.findMany();

        return departments;
    }

    async getDepartmentById(_id: string) {
        const department = await this.prismaService.department.findUnique({
            where: {
                id: _id
            }
        });

        return department;
    }

    async updateDepartment(dto, _id: string) {
        return await this.prismaService.department.update({
            where: {
                id: _id
            },
            data: dto
        });
    }

    async deleteDepartment(_id: string) {
        return await this.prismaService.department.delete({
            where: {
                id: _id
            }
        });
    }
}
