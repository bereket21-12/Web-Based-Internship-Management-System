import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto, UpdateFeedbackDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class FeedbackService {
    constructor(
        private prismaService: PrismaService
    ) {}

    async getAllFeedback() {
        return this.prismaService.feedback.findMany();
    }

    async getFeedbackById(_id: string) {
        return this.prismaService.feedback.findUnique({
            where: {
                id: _id
            }
        });
    }

    async createFeedback(createFeedbackDto: CreateFeedbackDto){
        return this.prismaService.feedback.create({
            data: createFeedbackDto
        });
    }

    async updateFeedback(updateFeedbackDto: UpdateFeedbackDto, _id: string) {
        return this.prismaService.feedback.update({
            where: {
                id: _id
            },
            data: updateFeedbackDto
        });
    }

    async deleteFeedback(_id: string){
        return this.prismaService.feedback.delete({
            where: {
                id: _id
            }
        });
    }
}
