import { Body, Controller, Delete, Get, Param, Patch,Post } from '@nestjs/common';
import { CollegeService } from './college.service';


@Controller('college')
export class CollegeController {
    constructor(
        private CollegeService: CollegeService,
    ) {}

    @Get()
    async getColleges() {
        return this.CollegeService.allColleges();
    }
    @Get("dep")
    async getcollegewithDep() {
        return this.CollegeService.getCollegeDep();
    }

    @Post('create')
    // @HttpCode(HttpStatus.CREATED)
    async registerCollege(
        @Body() dto: any,
    ): Promise<any> {
        console.log(dto)
        
        return this.CollegeService.registerCollege(dto);
 
    }

    

        @Get(':id')
        async getUniversityById(@Param('id') id: string) {
            return this.CollegeService.getCollegeById(id);
        }


        @Get('un/:id')
        async getUniversityByuniversityId(@Param('id') id: string) {
            return this.CollegeService.getcollegeByuniversityId(id);
        }
    
        @Patch(':id')
        async updateUniversity(@Body() dto, @Param('id') id: string) {
            return this.CollegeService.updatecollege(dto, id);
        }
    
        @Delete(':id')
        async deleteUniversity(@Param('id') id: string) {
            return this.CollegeService.deleteCollege(id);
        }
}
