import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private studentService : StudentService){}

    @Get(":id")
    async getUniversityStudents(@Param('id') id :string){
        return await this.studentService.getStudentInUniversity(id)  
    
    }
}
