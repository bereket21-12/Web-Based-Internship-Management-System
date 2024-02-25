import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RemoveService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async removeMentor(_id: string): Promise<any> {
        const removedMentor = await this.prismaService.mentor.delete({
            where: {
                id: _id
            }
        })
        return removedMentor;
    }

    async removeAdvisor(_id: string): Promise<any> {
        const removedAdvisor = await this.prismaService.advisor.delete({
            where: {
                id: _id
            }
        })
        return removedAdvisor;
    }

    async removeCollege(_id: string): Promise<any> {
        const removedCollege = await this.prismaService.college.delete({
            where: {
                id: _id
            }
        })
        return removedCollege;
    }

    async removeDepartmentHead(_id: string): Promise<any> {
        const removedDepartmentHead = await this.prismaService.department.delete({
            where: {
                id: _id
            }
        })
        return removedDepartmentHead;
    }
}
