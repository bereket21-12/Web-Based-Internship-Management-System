import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Tokens } from 'src/common/types';
import * as argon from 'argon2';
import { GenerateJwtService } from '../jwt/generate.jwt.service';

@Injectable()
export class LoginService {
    constructor(
        private prismaService: PrismaService,
        private generateJwtService: GenerateJwtService,
    ) { }

    async login(dto: LoginDto): Promise<Tokens> {
        console.log('LoginService.login', dto);

        // Retrieve user and await the Promise resolution
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });

        // Check if user exists and the password hash is available
        if (!user || !user.password) {
            throw new ForbiddenException('Invalid email or password');
        }

        // Verify the password
        const passwordMatches = await argon.verify(user.password, dto.password);
        if (!passwordMatches) {
            throw new ForbiddenException('Invalid email or password');
        }

        // Generate tokens
        const tokens = await this.generateJwtService.getToken(user.id, user.email, user.roleName);

        // Update refresh token hash in the database
        await this.updateRtHash(user.id, tokens.refresh_token);
        console.log('tokens', tokens);
        return JSON.parse(JSON.stringify(tokens)) as Tokens;
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
