import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get(':id')
  async getUniversityStudents(@Param('id') id: string) {
    return await this.studentService.getStudentInUniversity(id);
  }
  @Get('dep/:id')
  async getDepStudents(@Param('id') id: string) {
    return await this.studentService.getStudentInDeptoApprove(id);
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get('approve/:id')
  async approveStudents(@Param('id') id: string) {
    return await this.studentService.approveStudent(id);
  }
  //get the number of students assigned to the advisor
  @Get('countstdinadv/:id')
  async getCountofAdvisorStudents(@Param('id') id: string) {
    return await this.studentService.getCountAdvisorStudent(id);
  }

  //get lists of students assigned to advisor
  @Get('advisorstd/:id')
  async getAdvisorStudents(@Param('id') id: string) {
    return await this.studentService.getAdvisorStudent(id);
  }

  @Get('countvalid/:id')
  async countStudentsindp(@Param('id') id: string) {
    return await this.studentService.getCountStudentInDep(id);
  }

  @Get('countApprove/:id')
  async countStudentstoapprove(@Param('id') id: string) {
    return await this.studentService.getCountStudentInDeptoApprove(id);
  }

  @Post('evaluateByMentor/:id/:point')
  async evaluateStudentByMentor(
    @Param('id') id: string,
    @Param('point') point: string,
  ) {
    return await this.studentService.evaluateStudentByMentor(id, point);
  }

  @Post('evaluateByAdvisor/:id/:point')
  async evaluateStudentByAdvisor(
    @Param('id') id: string,
    @Param('point') point: string,
  ) {
    return await this.studentService.evaluateStudentbyAdvisor(id, point);
  }
}
