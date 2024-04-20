import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private prismaService :PrismaService){}


    async getStudentInUniversity(id: string) {

        const student = await this.prismaService.student.findMany({
            where: {
                universityId: id
            },
        include: {
            advisor: true,
            department:true,
            
            
        },
        });

        return student;
    }
}
