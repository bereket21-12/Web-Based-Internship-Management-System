import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private prismaService :PrismaService){}

    async getAllStudents() {
        const students = await this.prismaService.student.findMany({
            include: {
                advisor: true,
                department:true,
                user:true     
            },
        });
    }

    async getStudentInUniversity(id: string) {

        const student = await this.prismaService.student.findMany({
            where: {
                universityId: id
            },
        include: {
            advisor: true,
            department:true,
            user:true
            
            
        },
        });

        return student;
    }
}
