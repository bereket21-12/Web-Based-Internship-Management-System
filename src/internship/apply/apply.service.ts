import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/common/dtos';

@Injectable()
export class ApplyService {
    constructor(
        private prismaService: PrismaService
        ) {}

    async createApplication(dto: CreateApplicationDto) {
        return this.prismaService.application.create({
            data: {
                studentId: dto.studentId,
                companyId: dto.companyId,
                internshipId: dto.internshipId,
                status: dto.status
            }
        });        
    }

    async updateApplication(_id: string, dto: UpdateApplicationDto) {
        return this.prismaService.application.update({
            where: {
                id: _id,
            },
            data: {
                status: dto.status
            }
        })
    }

    async getApplications() {
        return this.prismaService.application.findMany();
    }

    async getApplicationById(id: string) {
        return this.prismaService.application.findUnique({
            where: {
                id
            }
        });
    }

    async deleteApplication(id: string) {
        return this.prismaService.application.delete({
            where: {
                id
            }
        });
    }
}
