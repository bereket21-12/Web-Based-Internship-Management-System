import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { collegeRegisterDto } from 'src/common/dtos/college.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';


@Injectable()
export class CollegeService {
    constructor(private prismaService :PrismaService){}

     async allColleges (){

        const colleges = await this.prismaService.college.findMany({

            
                include: {
                    collegeDean: true,
                },
        
        });

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
                    },
                    collegeDean :{
                        connect:{
                            id:dto.collegeDeanId
                        }
                    }
                    
                }}).then(

                    
                )
                
               
                return college
               
        } catch (error) {
            console.log(error)
            
        }
return null

}
    async getCollegeById(id: string) {

        const college = await this.prismaService.college.findMany({
            where: {
                universityId :id
               },
        include: {
            departments: true,
            collegeDean:true
        },
        });

        return college;
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
      
    async getCollegeDep() {
        const collegesWithDepartments = await this.prismaService.college.findMany({
          include: {
            departments: true,
            collegeDean:true
            
          },
        });
    
        return collegesWithDepartments;
      }



}
