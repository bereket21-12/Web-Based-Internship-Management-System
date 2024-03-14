import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateFormDto, CreateQuestionsDto, UpdateFormDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class FormGenerateService {
    constructor(
        private prismaService: PrismaService,
        private cloudinaryService: CloudinaryService
    ) {}

    async createForm(dto: CreateFormDto) {
        return await this.prismaService.form.create({
            data: {
                title: dto.title,
                description: dto.description,
                attachedUrl: dto.attachedFileUrl,
                attachedFilePublicId: dto.attachedFilePublicId,
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
                attachedUrl: dto.attachedFileUrl,
                attachedFilePublicId: dto.attachedFilePublicId,
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
        const form = await this.prismaService.form.findUnique({
            where: { id },
            select: {
                id: true,  // Ensure availability of 'id' even if attachedFilePublicId is missing
                attachedFilePublicId: true,
                Question: true,  // Include questions for deletion
            },
        });

        if (!form) {
            return null; // Handle the case where the form is not found
        }

        // Delete attached file from Cloudinary (if applicable)
        if (form.attachedFilePublicId) {
            await this.cloudinaryService.deleteFile(form.attachedFilePublicId);
        }

        // Delete the form and questions in a single transaction
        const transaction = await this.prismaService.$transaction([
            this.prismaService.form.delete({
                where: { id },
            }), // Deletion of questions already handled within the transaction
        ]);

        return transaction[0]; // Return the deleted form
    }

}
