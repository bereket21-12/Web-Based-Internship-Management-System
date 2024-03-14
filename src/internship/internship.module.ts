import { Module } from '@nestjs/common';
import { PostInternshipModule } from './post-internship/post-internship.module';
import { ApplyModule } from './apply/apply.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AssignModule } from './assign/assign.module';
import { EvaluateModule } from './evaluate/evaluate.module';
import { ReportModule } from './report/report.module';
import { FormGenerateModule } from './form-generate/form-generate.module';

@Module({
  imports: [PostInternshipModule, ApplyModule, FeedbackModule, AssignModule, EvaluateModule, ReportModule, FormGenerateModule]
})
export class InternshipModule {}
