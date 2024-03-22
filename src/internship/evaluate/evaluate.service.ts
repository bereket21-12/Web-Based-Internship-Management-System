import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        const data: Prisma.EvaluationCreateInput = {
            student: {
                connect: {
                    id: dto.studentId
                }
            },
            form: {
                connect: {
                    id: dto.formId
                }
            },
            evaluationDate: dto.evaluationDate,
            response: dto.response,
        };

        // Check if mentorId is provided
        if (dto.mentorId) {
            data.mentor = {
                connect: {
                    id: dto.mentorId
                }
            };
        }

        // Check if advisorId is provided
        if (dto.advisorId) {
            data.advisor = {
                connect: {
                    id: dto.advisorId
                }
            };
        }

        return this.prismaService.evaluation.create({
            data: data,
        });
    }

    async updateEvaluation(id: string, dto: UpdateEvaluationDto) {
        return this.prismaService.evaluation.update({
            where: {
                id: id
            },
            data: {
                studentId: dto.studentId,
                formId: dto.formId,
                evaluationDate: dto.evaluationDate,
                response: dto.response,
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

