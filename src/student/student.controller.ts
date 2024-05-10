import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
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

  @Get('countvalid/:id')
  async countStudentsindp(@Param('id') id: string) {
    return await this.studentService.getCountStudentInDep(id);
  }

  @Get('countApprove/:id')
  async countStudentstoapprove(@Param('id') id: string) {
    return await this.studentService.getCountStudentInDeptoApprove(id);
  }
}
