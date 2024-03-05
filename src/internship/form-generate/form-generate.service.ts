import { Injectable } from '@nestjs/common';
import { CreateFormDto, CreateQuestionsDto, UpdateFormDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class FormGenerateService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async createForm(dto: CreateFormDto) {
        return await this.prismaService.form.create({
            data: {
                title: dto.title,
                description: dto.description,
                college: {
                    connect: { id: dto.collegeId } // Connect to existing college using ID
                },
                totalWeight: dto.totalWeight,
                type: dto.formType,
                Question: {
                    createMany: {
                        data: dto.questions.map((question: CreateQuestionsDto) => ({ // Use question property
                            content: question.content,
                            weight: question.weight,
                        })),
                    },
                },
            },
        });
    }

    async updateForm(id: string, dto: UpdateFormDto) {
        return await this.prismaService.form.update({
            where: {
                id
            },
            data: {
                title: dto.title,
                description: dto.description,
                totalWeight: dto.totalWeight,
                type: dto.formType,
                Question: {
                    deleteMany: {}, // Delete all questions
                    createMany: {
                        data: dto.questions.map((question: CreateQuestionsDto) => ({ // Use question property
                            content: question.content,
                            weight: question.weight,
                        })),
                    },
                },
            },
        });
    }

    async getForms() {
        return await this.prismaService.form.findMany();
    }

    async deleteForm(id: string): Promise<any> {
        // Delete the form and its associated questions in a single transaction
        const transaction = await this.prismaService.$transaction([
            this.prismaService.form.delete({
                where: { id },
                include: { Question: true }, // Include associated questions
            }),
            this.prismaService.question.deleteMany({
                where: { formId: id }, // Delete questions with matching formId
            }),
        ]);

        return transaction[0]; // Return the deleted form
    }


}
