import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CompanyService {
    constructor(
        private prismaService: PrismaService,

    ) {}

    async getCompanies() {
        return await this.prismaService.company.findMany();
    }

    async getCompanyById(id: string) {
        return await this.prismaService.company.findUnique({
            where: {
                id
            }
        });
    }

    async getInternshipsByCompanyId(id: string) {
        return await this.prismaService.internship.findMany({
            where: {
                companyId: id
            }
        });
    }

    async findStudentsByCompanyId(companyId: string) {
        return await this.prismaService.student.findMany({
            where: { 
                Application: { // This is the name of the relation in the Prisma schema
                    some: { // This is the Prisma filter that checks if at least one record in the relation meets the condition
                        internship: {
                            companyId: companyId,
                        }
                    }
                }
            },
        })
    }
}
