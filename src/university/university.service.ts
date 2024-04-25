import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UniversityService {
    constructor(
        private prismaService: PrismaService
    ) { }
    async getUniversities() {
        const universities = await this.prismaService.university.findMany();

        return universities;
    }

    async getUniversityById(_id: string) {
        const university = await this.prismaService.university.findUnique({
            where: {
                id: _id
            },
            include:{
                departments:true
            }
        });

        return university;
    }

    async getCountUniversityById(_id: string) {
        const university = await this.prismaService.university.findUnique({

            where: {
                id: _id
            },
            include:{
                departments:true,
                college:true,
                Student:true,
                universityUsers:true,
            }
        });

        return [university.Student.length,university.departments.length,university.college.length,university.universityUsers.length]
    }

    async updateUniversity(dto, _id: string) {
        return await this.prismaService.university.update({
            where: {
                id: _id
            },
            data: dto
        });
    }

    async deleteUniversity(_id: string) {
        return await this.prismaService.university.delete({
            where: {
                id: _id
            }
        });
    }
}
