import { Injectable } from '@nestjs/common';
import { CreateAssignDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AssignService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async assignMentor(dto: CreateAssignDto) {
        const { studentId, mentorId } = dto;
        const student = await this.prismaService.student.update({
            where: {
                id: studentId
            },
            data: {
                mentor: {
                    connect: {
                        id: mentorId
                    }
                }
            }
        })

        return student;
    }

    async assignAdvisor(dto: CreateAssignDto) {
        const { studentId, advisorId } = dto;
        const student = await this.prismaService.student.update({
            where: {
                id: studentId
            },
            data: {
                advisor: {
                    connect: {
                        id: advisorId
                    }
                }
            }
        })

        return student;
    }
}
