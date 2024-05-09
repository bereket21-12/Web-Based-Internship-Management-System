import { Test, TestingModule } from '@nestjs/testing';
import { PostInternshipService } from './post-internship.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Schedule, Compensations, CreateInternship } from 'src/common/dtos';
import { Prisma } from '.prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

describe('PostInternshipService', () => {
    let service: PostInternshipService;
    let prismaService: Partial<PrismaService>;

    beforeEach(async () => {
        prismaService = {
            internship: {
                findMany: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Internship' }]),
                create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: '2', ...dto.data })),
                findUnique: jest.fn().mockResolvedValue(null),
                update: jest.fn().mockResolvedValue({}),
                delete: jest.fn().mockResolvedValue({}),
                // other methods are not mocked but are no longer required by TypeScript to be present
            } as Partial<Prisma.InternshipDelegate<DefaultArgs>>,
            internshipDescription: {
                create: jest.fn().mockResolvedValue({ id: 'desc1', description: 'Description' }),
                update: jest.fn().mockResolvedValue({}),
                delete: jest.fn().mockResolvedValue({}),
            } as Partial<Prisma.InternshipDescriptionDelegate<DefaultArgs>>,
        } as Partial<PrismaService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostInternshipService,
                {
                    provide: PrismaService,
                    useValue: prismaService
                },
            ],
        }).compile();

        service = module.get<PostInternshipService>(PostInternshipService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllInternship', () => {
        it('should return an array of internships', async () => {
            const internships = await service.getAllInternship();
            expect(internships).toEqual([{ id: '1', title: 'Test Internship' }]);
            expect(prismaService.internship.findMany).toHaveBeenCalled();
        });
    });

    describe('createInternship', () => {
        it('should successfully create an internship', async () => {
            const dto: CreateInternship = {
                title: "New Internship",
                companyId: "comp1",
                responsibilities: ["Manage tasks"],
                qualifications: ["Bachelor's Degree"],
                applicationInstructions: "Apply here",
                description: "Full internship details",
                deadline: new Date(),
                startDate: new Date(),
                endDate: new Date(),
                schedule: Schedule.FULL_TIME,
                compensations: Compensations.PAID,
            };
            const result = await service.createInternship(dto);
            expect(result).toHaveProperty('id', '2');
            expect(prismaService.internship.create).toHaveBeenCalledWith({
                data: expect.anything()
            });
        });
    });
});
