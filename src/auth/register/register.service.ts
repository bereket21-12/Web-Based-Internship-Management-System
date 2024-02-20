import { Injectable } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';
import { Tokens } from 'src/common/types';
import { GenerateJwtService } from '../jwt/generate.jwt.service';

@Injectable()
export class RegisterService {
    constructor(
        private prismaService: PrismaService,
        private generateJwtService: GenerateJwtService
    ) {}

    async registerUniversity(dto: UniversityRegisterDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.adminPassword)

        const newUniversity = await this.prismaService.university.create({
            data: {
                name: dto.universityName,
                email: dto.universityEmail,
                phoneNum: dto.universityPhoneNumber,
                websiteUrl: dto.websiteUrl,
                logoUrl: dto.universityLogoUrl,
                address: dto.address,
                universityAdmin: {
                    create: {
                        userName: dto.adminUserName,
                        email: dto.adminEmail,
                        password: hashedPassword,
                        firstName: dto.adminFirstName,
                        middleName: dto.adminMiddleName,
                        profilePic: dto.adminProfilePicture,
                        phoneNum: dto.adminPhoneNumber,
                        roleName: 'UNIVERSITY_ADMIN',
                    },
                }
            }
        })

        const tokens = await this.generateJwtService.getToken(newUniversity.id, dto.adminEmail, 'UNIVERSITY_ADMIN');
        await this.updateRtHash(newUniversity.universityAdminId, tokens.refresh_token);
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
