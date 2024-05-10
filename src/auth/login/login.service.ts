import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Tokens } from 'src/common/types';
import * as argon from 'argon2';
import { GenerateJwtService } from '../jwt/generate.jwt.service';
import { UniversityService } from 'src/university/university.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class LoginService {
  constructor(
    private prismaService: PrismaService,
    private generateJwtService: GenerateJwtService,
    private filterUnservice: UniversityService,
    private filterDepId: UsersService,
  ) {}

  async login(dto: LoginDto): Promise<any> {
    console.log('LoginService.login', dto);
    // Retrieve user and await the Promise resolution
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // Check if user exists and the password hash is available
    if (!user || !user.password) {
      throw new ForbiddenException('Invalid email or password');
    }

    const unId = await this.filterUnservice.filterUniversityByUserID(user.id);
    const dpId = await this.filterDepId.getUserDepartmentId(user.id);
    console.log('uniD', unId);
    console.log('DepiD', dpId);

    // Verify the password
    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid email or password');
    }

    // Generate tokens
    const tokens = await this.generateJwtService.getToken(
      user.id,
      user.email,
      user.roleName,
    );
    // Update refresh token hash in the database
    await this.updateRtHash(user.id, tokens.refresh_token);
    console.log('tokens', tokens);
    if (unId || dpId) {
      const userWithTokens = {
        unId,
        dpId,
        user,
        ...(JSON.parse(JSON.stringify(tokens)) as Tokens),
      };
      console.log(userWithTokens);
      return userWithTokens;
    }
    const userWithTokens = {
      user,
      ...(JSON.parse(JSON.stringify(tokens)) as Tokens),
    };
    console.log(userWithTokens);
    return userWithTokens;
  }

  async updateRtHash(userId: string, rtHash: string) {
    const hash = await argon.hash(rtHash);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
