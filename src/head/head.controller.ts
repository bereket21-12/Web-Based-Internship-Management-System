import { Controller, Param, Post } from '@nestjs/common';
import { HeadService } from './head.service';

@Controller('head')
export class HeadController {
  constructor(private headSevice: HeadService) {}

  @Post(':studentId/advisor/:advisorId')
  async assignAdvisorToStudent(
    @Param('studentId') studentId: string,
    @Param('advisorId') advisorId: string,
  ): Promise<void> {
    await this.headSevice.assignAdvisorToStudent(studentId, advisorId);
  }
}
