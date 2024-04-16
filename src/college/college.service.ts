import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class CollegeService {
    constructor(private prismaService :PrismaService){}


     async allColleges (){

        const colleges = await this.prismaService.college.findMany();

        return colleges;
    }

    async getcollegeById(_id: string) {
        const college = await this.prismaService.college.findUnique({
            where: {
                id: _id
            }
        });

        return college
    }

    async getcollegeByuniversityId(_id: string) {
        const college = await this.prismaService.college.findMany({
            where: {
             universityId :_id
            }
        });

        return college
    }

    async updatecollege(dto, _id: string) {
        return await this.prismaService.college.update({
            where: {
                id: _id
            },
            data: dto
        });
    }
    async deleteCollege(_id: string) {
        return await this.prismaService.college.delete({
            where: {
                id: _id
            }
        });
    }
      




}
