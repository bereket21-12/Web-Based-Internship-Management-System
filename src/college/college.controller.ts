import { Body, Controller, Delete, Get, Param, Patch,Post ,Header} from '@nestjs/common';
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
    @Get(':id')
    @Header('Access-Control-Allow-Origin', '*')
    async getUniversityById(@Param('id') id: string) {
        return this.CollegeService.getCollegeById(id);
    }

    @Get("dep")
    async getcollegewithDep() {
        return this.CollegeService.getCollegeDep();
    }
    @Get('un/:id')
    @Header('Access-Control-Allow-Origin', '*')

    async getUniversityByuniversityId(@Param('id') id: string) {
        return this.CollegeService.getcollegeByuniversityId(id);
    }

    @Post('create')
    // @HttpCode(HttpStatus.CREATED)
    async registerCollege(
        @Body() dto: any,
    ): Promise<any> {
        console.log(dto)
        
        return this.CollegeService.registerCollege(dto);
 
    }
    
        @Patch('update/:id')
        async updateUniversity(@Body() dto, @Param('id') id: string) {
            return this.CollegeService.updatecollege(dto, id);
        }
    
        @Delete(':id')
        async deleteUniversity(@Param('id') id: string) {
            return this.CollegeService.deleteCollege(id);
        }
}
