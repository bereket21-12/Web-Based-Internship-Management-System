import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { CreateEvaluationDto } from 'src/common/dtos';

@Controller('evaluate')
export class EvaluateController {
    constructor(
        private evaluateService: EvaluateService
    ) { }

    @Get()
    async getAllEvaluation() {
        return this.evaluateService.getAllEvaluation();
    }

    @Get(':id')
    async getEvaluationById(@Param('id') id: string) {
        return this.evaluateService.getEvaluationById(id);
    }

    @Post()
    async createEvaluation(@Body() dto: CreateEvaluationDto) {
        return this.evaluateService.createEvaluation(dto);
    }
}
