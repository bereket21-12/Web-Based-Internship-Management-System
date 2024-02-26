import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class GetService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getAllUsers(): Promise<any> {

        const users = await this.prismaService.user.findMany()
        return users;
    }

    async getUserById(_id: string): Promise<any> {

        const user = await this.prismaService.user.findUnique({
            where: {
                id: _id
            }
        })
        return user;
    }

    async getUsersByRole(role: string): Promise<any> {
        
        const users = await this.prismaService.user.findMany({
            where: {
                roleName: role
            }
        })
        return users;
    }

    async getMentorsById(_id: string): Promise<any> {
        const mentor = await this.prismaService.mentor.findUnique({
            where: {
                id: _id
            }
        })
        return mentor;
    }

    async getAdvisorById(_id: string): Promise<any> {
        const advisor = await this.prismaService.advisor.findUnique({
            where: {
                id: _id
            }
        })
        return advisor;
    }
}
