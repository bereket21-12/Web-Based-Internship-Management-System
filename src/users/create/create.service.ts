import { Injectable } from '@nestjs/common';
import { CreateAdvisorDto, CreateCollegeDto, CreateDepartmentHeadDto, CreateMentorDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CreateService {
    constructor(private prismaService: PrismaService) { }

    async createMentor(dto: CreateMentorDto) {
        const newMentorUser = await this.prismaService.user.create({
            data: {
                firstName: dto.mentorFirstName,
                middleName: dto.mentorMiddleName,
                userName: dto.mentorUserName,
                profilePic: dto.mentorProfilePicUrl,
                phoneNum: dto.mentorPhoneNum,
                verified: dto.mentorVerified,
                email: dto.mentorEmail,
                password: dto.mentorPassword,
                role: {
                    connect: {
                        name: dto.role
                    }
                }
            }
        })
        const newMentor = await this.prismaService.mentor.create({
            data: {
                user: {
                    connect: {
                        id: newMentorUser.id
                    }
                },
                company: {
                    connect: {
                        id: dto.companyId
                    }
                }
            }
        })
        return newMentor;
    }

    async createAdvisor(dto: CreateAdvisorDto): Promise<any> {
        const newAdvisorUser = await this.prismaService.user.create({
            data: {
                firstName: dto.advisorFirstName,
                middleName: dto.advisorMiddleName,
                userName: dto.advisorUserName,
                profilePic: dto.advisorProfilePicUrl,
                phoneNum: dto.advisorPhoneNum,
                verified: dto.advisorVerified,
                email: dto.advisorEmail,
                password: dto.advisorPassword,
                role: {
                    connect: {
                        name: dto.role
                    }
                }
            }
        })
        const newAdvisor = await this.prismaService.advisor.create({
            data: {
                user: {
                    connect: {
                        id: newAdvisorUser.id
                    }
                },
                department: {
                    connect: {
                        id: dto.departmentId
                    }
                }
            }
        })
        return newAdvisor;
    }

    async createDepartmentHead(dto: CreateDepartmentHeadDto): Promise<any> {
        const newDepartmentHead = await this.prismaService.user.create({
            data: {
                firstName: dto.departmentHeadFirstName,
                middleName: dto.departmentHeadMiddleName,
                userName: dto.departmentHeadUserName,
                profilePic: dto.departmentHeadProfilePicUrl,
                phoneNum: dto.departmentHeadPhoneNum,
                verified: dto.departmentHeadVerified,
                email: dto.departmentHeadEmail,
                password: dto.departmentHeadPassword,
                role: {
                    connect: {
                        name: dto.role
                    }
                }
            }
        })
        const newDepartment = await this.prismaService.department.create({
            data: {
                departmentHead: {
                    connect: {
                        id: newDepartmentHead.id
                    }
                },
                email: dto.departmentEmail,
                phoneNum: dto.departmentPhoneNum,
                college: {
                    connect: {
                        id: dto.collegeId
                    }
                },
                University: {
                    connect: {
                        id: dto.universityId
                    }
                },
                name: dto.departmentName
            }
        })

        return newDepartment;
    }

    async createCollege(dto: CreateCollegeDto): Promise<any> {
        const newCollegeDean = await this.prismaService.user.create({
            data: {
                firstName: dto.deanFirstName,
                middleName: dto.deanMiddleName,
                userName: dto.deanUserName,
                profilePic: dto.deanProfilePic,
                phoneNum: dto.deanPhoneNum,
                verified: dto.deanVerified,
                email: dto.deanEmail,
                password: dto.deanPassword,
                role: {
                    connect: {
                        name: dto.roleName
                    }
                }
            }
        })
        const newCollege = await this.prismaService.college.create({
            data: {
                collegeDean: {
                    connect: {
                        id: newCollegeDean.id,
                    },
                },
                email: dto.email,
                phoneNum: dto.phoneNum,
                university: {
                    connect: {
                        id: dto.universityId
                    }
                },
                name: dto.name
            }
        })
        return newCollege;
    }
}
