import { Module } from '@nestjs/common';
import { PostInternshipController } from './post-internship.controller';
import { PostInternshipService } from './post-internship.service';

@Module({
  controllers: [PostInternshipController],
  providers: [PostInternshipService]
})
export class PostInternshipModule {}
