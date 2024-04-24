import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';
import { GenerateJwtService } from '../jwt/generate.jwt.service';

@Injectable()
export class RefreshService {
    constructor(
        private prismaService: PrismaService,
        private generateJwtService: GenerateJwtService,
        ) {}

        async refreshTokens(userId: string, rt: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        })
        if (!user) throw new ForbiddenException('Access denied');

        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException('Access denied');

        const tokens = await this.generateJwtService.getToken((await user).id, (await user).email, (await user).roleName);
        console.log("Refreshed Token: ", tokens.refresh_token)
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }

    async updateRtHash(userId: string, rtHash: string) {
        const hash = await argon.hash(rtHash);
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }
}
