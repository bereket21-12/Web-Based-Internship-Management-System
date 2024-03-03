import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from 'src/common/dtos';

@Controller('feedback')
export class FeedbackController {
    constructor(
        private feedbackService: FeedbackService
    ) {}

    @Get()
    async getAllFeedback() {
        return this.feedbackService.getAllFeedback();
    }

    @Get(':id')
    async getFeedbackById(_id: string) {
        return this.feedbackService.getFeedbackById(_id);
    }

    @Post(':id')
    async createFeedback(@Body() createFeedbackDto: CreateFeedbackDto){
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Patch(':id')
    async updateFeedback(@Body() updateFeedbackDto: UpdateFeedbackDto, _id: string){
        return this.feedbackService.updateFeedback(updateFeedbackDto, _id);
    }

    @Delete(':id')
    async deleteFeedback(_id: string){
        return this.feedbackService.deleteFeedback(_id);
    }
}
