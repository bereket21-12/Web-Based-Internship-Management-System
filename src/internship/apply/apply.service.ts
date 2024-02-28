import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ApplyService {
    constructor(private prismaService: PrismaService) {}

    async createApplication() {
        
    }
}
