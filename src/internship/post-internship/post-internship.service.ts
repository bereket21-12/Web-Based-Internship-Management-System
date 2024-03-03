import { Injectable } from '@nestjs/common';
import { Internship, Prisma } from '@prisma/client';
import { CreateInternship, UpdateInternship } from 'src/common/dtos';
import { InternshipFilterDto } from 'src/common/dtos/internship-filter.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PostInternshipService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getAllInternship() {
        const internships = await this.prismaService.internship.findMany()
        return internships;
    }

    async findMany(filter?: InternshipFilterDto): Promise<Internship[]> {
        const where: Prisma.InternshipWhereInput = {};

        if (filter?.title) {
            where.title = {
                contains: filter.title
            }
        }

        if (filter?.companyId) {
            where.companyId = filter.companyId
        }

        if (filter?.schedule) {
            where.schedule = filter.schedule
        }

        if (filter?.compensations) {
            where.compensations = filter.compensations
        }

        const internships = await this.prismaService.internship.findMany({
            where
        })

        return internships;
    }

    async getInternshipById(_id: string) {
        const internship = await this.prismaService.internship.findUnique({
            where: {
                id: _id
            }
        })
        return internship;
    }

    async createInternship(dto: CreateInternship) {
        const internshipDescription = await this.prismaService.internshipDescription.create({
            data: {
                responsibilities: {
                    set: dto.responsibilities
                },
                qualifications: {
                    set: dto.qualifications
                },
                applicationInstructions: dto.applicationInstructions,
                deadline: dto.deadline
            }

        })
        const internship = this.prismaService.internship.create({
            data: {
                title: dto.title,
                company: {
                    connect: {
                        id: dto.companyId
                    }
                },
                duration: dto.duration,
                startDate: dto.startDate,
                endDate: dto.endDate,
                schedule: dto.schedule,
                compensations: dto.compensations,
                description: {
                    connect: {
                        id: internshipDescription.id
                    }
                }
            }
        })

        return internship;
    }

    async updateInternship(dto: UpdateInternship, _id: string) {
        const internshipDescription = await this.prismaService.internshipDescription.update({
            where: {
                id: dto.descriptionId
            },
            data: {
                responsibilities: {
                    set: dto.responsibilities
                },
                qualifications: {
                    set: dto.qualifications
                },
                applicationInstructions: dto.applicationInstructions,
                deadline: dto.deadline
            }
        })

        const internship = await this.prismaService.internship.update({
            where: {
                id: _id
            },
            data: {
                title: dto.title,
                company: {
                    connect: {
                        id: dto.companyId
                    }
                },
                duration: dto.duration,
                startDate: dto.startDate,
                endDate: dto.endDate,
                schedule: dto.schedule,
                compensations: dto.compensations,
                description: {
                    connect: {
                        id: internshipDescription.id
                    }
                }
            }
        })

        return internship;
    }

    async deleteInternship(dto: CreateInternship, _id: string) {
        const internship = Promise.all([
            this.prismaService.internship.delete({
                where: {
                    id: _id
                }
            }),
            this.prismaService.internshipDescription.delete({
                where: {
                    id: dto.descriptionId
                }
            })
        ])

        return internship;
    }
}
