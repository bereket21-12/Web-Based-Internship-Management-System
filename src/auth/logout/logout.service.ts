import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LogoutService {
    constructor(private prismaService: PrismaService) { }

    async logout(userId: string) {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                },
            },
            data: {
                hashedRt: null
            }
        })
    }
}
