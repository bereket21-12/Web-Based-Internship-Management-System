import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApplyService } from './apply.service';
import { Prisma } from '.prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { CreateApplicationDto, UpdateApplicationDto } from 'src/common/dtos';


describe('ApplyService', () => {
    let service: ApplyService;
    let prismaService: Partial<PrismaService>;

    beforeEach(async () => {
        // Mock PrismaService
        prismaService = {
            application: {
                create: jest.fn().mockResolvedValue({ id: '123', status: 'PENDING' }),
                update: jest.fn().mockResolvedValue({ id: '123', status: 'ACCEPTED' }),
                findMany: jest.fn().mockResolvedValue([{ id: '123', status: 'PENDING' }]),
                findUnique: jest.fn().mockResolvedValue({ id: '123', status: 'PENDING' }),
                delete: jest.fn().mockResolvedValue({ id: '123' }),
            } as Partial<Prisma.ApplicationDelegate<DefaultArgs>>,
        } as Partial<PrismaService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ApplyService,
                { provide: PrismaService, useValue: prismaService }
            ],
        }).compile();

        service = module.get<ApplyService>(ApplyService);
    });

    describe('createApplication', () => {
        it('should create an application', async () => {
            const dto: CreateApplicationDto = { studentId: '1', companyId: '1', internshipId: '1', status: 'PENDING' };
            const result = await service.createApplication(dto);
            expect(result).toEqual({ id: '123', status: 'PENDING' });
            expect(prismaService.application.create).toHaveBeenCalledWith({
                data: dto
            });
        });
    });

    describe('updateApplication', () => {
        it('should update an application', async () => {
            const dto: UpdateApplicationDto = { status: 'ACCEPTED' };
            const result = await service.updateApplication('123', dto);
            expect(result).toEqual({ id: '123', status: 'ACCEPTED' });
            expect(prismaService.application.update).toHaveBeenCalledWith({
                where: { id: '123' },
                data: dto
            });
        });
    });

    describe('getApplications', () => {
        it('should return all applications', async () => {
            const result = await service.getApplications();
            expect(result).toEqual([{ id: '123', status: 'PENDING' }]);
            expect(prismaService.application.findMany).toHaveBeenCalled();
        });
    });

    describe('getApplicationById', () => {
        it('should return a single application', async () => {
            const result = await service.getApplicationById('123');
            expect(result).toEqual({ id: '123', status: 'PENDING' });
            expect(prismaService.application.findUnique).toHaveBeenCalledWith({
                where: { id: '123' }
            });
        });
    });

    describe('deleteApplication', () => {
        it('should delete an application', async () => {
            const result = await service.deleteApplication('123');
            expect(result).toEqual({ id: '123' });
            expect(prismaService.application.delete).toHaveBeenCalledWith({
                where: { id: '123' }
            });
        });
    });

});
