import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async createStaffUser(createUserDto: CreateUserDto, universityId: any): Promise<any> {
        const hashedPassword = await argon.hash(createUserDto.userPassword);
    
        const newUser = await this.prismaService.user.create({
            data: {
              firstName: createUserDto.firstName,
              middleName: createUserDto.middleName,
              userName: createUserDto.userName,
              profilePic: createUserDto.profilePic,
              imagePublicId: createUserDto.profilePicPublicId,
              phoneNum: createUserDto.phoneNum,
              verified: false,
              email: createUserDto.email,
              password: hashedPassword,
              roleName: createUserDto.roleName,
            },
          });
      
          // Create the association between the user and the university
          await this.prismaService.universityUser.create({
            data: {
              universityId: universityId,
              userId: newUser.id,
            },
          });
      
          return newUser;
    }
    
    

    async getAllUsers(): Promise<any> {
        const allUsers = await this.prismaService.user.findMany();
        return allUsers;
    }

    async getUserById(id: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        });
        return user;
    }

    async getAllUniversityUsers(id: string): Promise<any> {
        const allUsers = await this.prismaService.universityUser.findMany({
            where: {
                universityId: id,
                user: {
                    roleName: {
                        not: "student"
                    }
                }
            },
            include: {
                user: true
            }
        });
        return allUsers;
    }


        async getAllUniversityStudents(id: string): Promise<any> {
        const allUniversity = await this.prismaService.student.findMany({
            where: {

                 universityId:id

                }
         
            })
       
        return allUniversity;
    }

 

    

    

    async updateUser(updateUserDto, id: string): Promise<any> {

        const updatedUser = await this.prismaService.user.update({
            where: {
                id: id
            },
            data: updateUserDto
        });
        return updatedUser;
    }

    async verifyUser(id: string) {
        const verifiedUser = await this.prismaService.user.update({
            where: {
                id: id
            },
            data: {
                verified: true
            }
        });
        return verifiedUser;
    }

    async deleteUser(id: string) {
        const deletedUser = await this.prismaService.user.delete({
            where: {
                id: id
            }
        });
        return deletedUser;
    }

    async getNormalUser(id:string): Promise<any> {
        const usersWithoutRole = await this.prismaService.user.findMany({
            where: {
                OR: [
                    { role: null },
                    { roleName: null }
                ],
                universityUsers:{
                    every:{
                        universityId:id
                    }
                }
            }
        });
        return usersWithoutRole;
    }

    async getCOLLEGE_DEAN(): Promise<any> {
        const usersWithoutRole = await this.prismaService.user.findMany({
            where: {
                
                
                roleName: "COLLEGE_DEAN"
            
            }
        });
        return usersWithoutRole;
    }
    async getDEPARTMENT_HEAD(): Promise<any> {
        const usersWithoutRole = await this.prismaService.user.findMany({
            where: {
                
                
                roleName: "DEPARTMENT_HEAD"
            
            }
        });
        return usersWithoutRole;
    }

    async getNotDeanandHeadUser(): Promise<any> {
        const usersWithoutRole = await this.prismaService.user.findMany({
            // where: {
            //     AND: [
            //         { College: null },
            //         { Department: null },
                    
            //     ]
            // }
        });
        return usersWithoutRole;
    }

    async assignRoleToUser(userId: string, roleName: string): Promise<any> {

        return this.prismaService.user.update({
            where: { id: userId },
            data: { roleName: roleName }
        });
    }
    
}

