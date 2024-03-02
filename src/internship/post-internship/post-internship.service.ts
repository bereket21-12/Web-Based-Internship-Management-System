import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class PostInternshipService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getAllInternship() {
        const internships = await this.prismaService.internship.findMany()
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
}
