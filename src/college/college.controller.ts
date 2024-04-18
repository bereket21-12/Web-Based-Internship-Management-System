import { Body, Controller, Delete, Get, Param, Patch,Post } from '@nestjs/common';
import { CollegeService } from './college.service';


@Controller('college')
export class CollegeController {
    constructor(
        private CollegeService: CollegeService,
    ) {}

    @Post('create')
    // @HttpCode(HttpStatus.CREATED)
    async registerCollege(
        @Body() dto: any,
    ): Promise<any> {
        console.log(dto)
        
        return this.CollegeService.registerCollege(dto);
 
    }
        @Get()
        async getUniversities() {
            return this.CollegeService.allColleges();
        }
    

        @Get(':id')
        async getUniversityById(@Param('id') id: string) {
            return this.CollegeService.getcollegeById(id);
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
