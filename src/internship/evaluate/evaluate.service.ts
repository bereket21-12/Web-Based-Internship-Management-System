import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto, UpdateEvaluationDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class EvaluateService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getAllEvaluation() {
        return this.prismaService.evaluation.findMany();
    }

    async getEvaluationById(id: string) {
        return this.prismaService.evaluation.findUnique({
            where: {
                id: id
            }
        });
    }

    async createEvaluation(dto: CreateEvaluationDto) {
        return this.prismaService.evaluation.create({
            data: {
                student: {
                    connect: {
                        id: dto.studentId
                    }
                },
                mentor: {
                    connect: {
                        id: dto.mentorId
                    }
                },
                advisor: {
                    connect: {
                        id: dto.advisorId
                    }
                },
                form: {
                    connect: {
                        id: dto.formId
                    }
                },
                evaluationDate: dto.evaluationDate,
                response: dto.response,
            }
        });
    }

    async updateEvaluation(id: string, dto: UpdateEvaluationDto) {
        return this.prismaService.evaluation.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        });
    }

    async deleteEvaluation(id: string) {
        return this.prismaService.evaluation.delete({
            where: {
                id: id
            }
        });
    }
}

