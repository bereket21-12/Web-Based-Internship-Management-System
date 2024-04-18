import { Injectable } from '@nestjs/common';
import { collegeRegisterDto } from 'src/common/dtos/college.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class CollegeService {
    constructor(private prismaService :PrismaService){}

     async allColleges (){

        const colleges = await this.prismaService.college.findMany();

        return colleges;
    }

    async registerCollege(dto :collegeRegisterDto){

        try {
            
         const  college =  await  this.prismaService.college.create({

                data:{
                    phoneNum:dto.phoneNum,
                    Collegename:dto.Collegename,
                    email:dto.email,
                    university :{
                        connect: {
                            id: dto.universityId
                        }
                    }
                }})
               
                return college
               
        } catch (error) {
            console.log(error)
            
        }
return null

}
    async getcollegeById(_id: string) {
        const college = await this.prismaService.college.findMany({
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
