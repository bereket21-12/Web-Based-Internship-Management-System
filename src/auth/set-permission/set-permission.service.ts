import { Injectable } from '@nestjs/common';
import { SetPermissionDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SetPermissionService {
    constructor(private prismaService: PrismaService) { }

    async setPermission(dto: SetPermissionDto[]) {
        const roleIds = await Promise.all(dto.map(async (roleData) => {
            const role = await this.prismaService.role.create({
                data: roleData,
            })
            return role.id
        }))

        return roleIds
    }
    
    async getRoles() {
        const roles = await this.prismaService.role.findMany();
        return roles
    }
}
