import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LoginService {
    constructor(private primsmaService: PrismaService) {}

    login(dto: LoginDto) {
        return dto;
    }
}
