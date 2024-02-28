import { Injectable } from '@nestjs/common';
import { UpdateAdvisorDto, UpdateCollegeDto, UpdateDepartmentHeadDto, UpdateMentorDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class EditService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async updateMentor(dto: UpdateMentorDto, _id: string): Promise<any> {
        const updatedMentor = await this.prismaService.mentor.update({
            where: {
                id: _id
            },
            data: {
                user: {
                    update: {
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
                },
                company: {
                    connect: {
                        id: dto.companyId
                    }
                }
            }
        })
        return updatedMentor;
    }

    async updateAdvisor(dto: UpdateAdvisorDto, _id: string): Promise<any> {
        const updatedAdvisor = await this.prismaService.advisor.update({
            where: {
                id: _id
            },
            data: {
                user: {
                    update: {
                        firstName: dto.advisorFirstName,
                        middleName: dto.advisorMiddleName,
                        userName: dto.advisorUserName,
                        profilePic: dto.advisorProfilePicUrl,
                        phoneNum: dto.advisorPhoneNum,
                        // hashedRt: dto.advisorHashedRt,
                        verified: dto.advisorVerified,
                        email: dto.advisorEmail,
                        password: dto.advisorPassword,
                        role: {
                            connect: {
                                name: dto.role
                            }
                        }
                    }
                },
                department: {
                    connect: {
                        id: dto.departmentId
                    }
                }
            }
        })
        return updatedAdvisor;
    }

    async updateDepartmentHead(dto: UpdateDepartmentHeadDto, _id: string): Promise<any> {
        const updatedDepartmentHead = await this.prismaService.department.update({
            where: {
                id: _id
            },
            data: {
                departmentHead: {
                    update: {
                        firstName: dto.departmentHeadFirstName,
                        middleName: dto.departmentHeadMiddleName,
                        userName: dto.departmentHeadUserName,
                        profilePic: dto.departmentHeadProfilePicUrl,
                        phoneNum: dto.departmentHeadPhoneNum,
                        hashedRt: dto.departmentHeadHashedRt,
                        verified: dto.departmentHeadVerified,
                        email: dto.departmentHeadEmail,
                        password: dto.departmentHeadPassword,
                        role: {
                            connect: {
                                name: dto.role
                            }
                        }
                    }
                },
                college: {
                    connect: {
                        id: dto.collegeId
                    }
                }
            }
        })
        return updatedDepartmentHead;
    }

    async updateCollege(dto: UpdateCollegeDto, _id: string): Promise<any> {
        const updatedCollege = await this.prismaService.college.update({
            where: {
                id: _id
            },
            data: {
                name: dto.name,
                collegeDean: {
                    update: {
                        firstName: dto.deanFirstName,
                        middleName: dto.deanMiddleName,
                        userName: dto.deanUserName,
                        profilePic: dto.deanProfilePic,
                        phoneNum: dto.deanPhoneNum,
                        email: dto.deanEmail,
                        password: dto.deanPassword,
                        verified: dto.deanVerified,
                        role: {
                            connect: {
                                name: dto.roleName
                            }
                        }
                    }
                },
                university: {
                    connect: {
                        id: dto.universityId
                    }
                }
            }
        })
        return updatedCollege;
    }
}
