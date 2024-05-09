import { Test, TestingModule } from '@nestjs/testing';
import { RefreshService } from './refresh.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { GenerateJwtService } from '../jwt/generate.jwt.service';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';


jest.mock('argon2', () => ({
    verify: jest.fn(),
    hash: jest.fn()
}));

describe('RefreshService', () => {
    let service: RefreshService;
    let prismaService: Partial<PrismaService>;
    let jwtService: Partial<GenerateJwtService>;

    beforeEach(async () => {
        prismaService = {
            user: {
                findUnique: jest.fn(),
                update: jest.fn()
            } as Partial<Prisma.UserDelegate<DefaultArgs>>,
        } as Partial<PrismaService>;
        jwtService = {
            getToken: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshService,
                {
                    provide: PrismaService,
                    useValue: prismaService
                },
                {
                    provide: GenerateJwtService,
                    useValue: jwtService
                },
            ],
        }).compile();
        
        service = module.get<RefreshService>(RefreshService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('refreshTokens', () => {
        it('should throw ForbiddenException if user does not exist', async () => {
            prismaService.user.findUnique = jest.fn().mockResolvedValue(null) as any;
            await expect(service.refreshTokens('user-id', 'token'))
                .rejects.toThrow(ForbiddenException);
        });

        it('should throw ForbiddenException if refresh token does not match', async () => {
            prismaService.user.findUnique = jest.fn().mockResolvedValue({
                id: 'user-id',
                email: 'email@test.com',
                roleName: 'User',
                hashedRt: 'hashed-refresh-token'
            });
            (argon.verify as jest.Mock).mockResolvedValue(false);

            await expect(service.refreshTokens('user-id', 'invalid-token'))
                .rejects.toThrow(ForbiddenException);
        });

        it('should successfully refresh tokens when session is valid', async () => {
            prismaService.user.findUnique = jest.fn().mockResolvedValue({
                id: 'user-id',
                email: 'email@test.com',
                roleName: 'User',
                hashedRt: 'hashed-refresh-token'
            });
            (argon.verify as jest.Mock).mockResolvedValue(true); // Mock to return true
            jwtService.getToken = jest.fn().mockResolvedValue({
                access_token: 'new-access-token',
                refresh_token: 'new-refresh-token'
            });
            (argon.hash as jest.Mock).mockResolvedValue('new-hashed-rt');

            const result = await service.refreshTokens('user-id', 'valid-token');

            expect(result).toEqual({
                access_token: 'new-access-token',
                refresh_token: 'new-refresh-token'
            });
            expect(jwtService.getToken).toHaveBeenCalledWith('user-id', 'email@test.com', 'User');
            expect(prismaService.user.update).toHaveBeenCalledWith({
                where: { id: 'user-id' },
                data: { hashedRt: 'new-hashed-rt' }
            });
        });
    });
});
