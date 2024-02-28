import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateAdvisorDto, CreateCollegeDto, CreateDepartmentHeadDto, CreateMentorDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CreateService {
    constructor(
        private prismaService: PrismaService,
        private cloudinary: CloudinaryService
    ) { }

    async createMentor(dto: CreateMentorDto) {
        const newMentorUser = await this.prismaService.user.create({
            data: {
                firstName: dto.mentorFirstName,
                middleName: dto.mentorMiddleName,
                userName: dto.mentorUserName,
                profilePic: dto.mentorProfilePicUrl,
                imagePublicId: dto.mentorImagePublicId,
                phoneNum: dto.mentorPhoneNum,
                verified: true,
                email: dto.mentorEmail,
                password: dto.mentorPassword,
                role: {
                    connect: {
                        name: "MENTOR"
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
                imagePublicId: dto.advisorImagePublicId,
                phoneNum: dto.advisorPhoneNum,
                verified: true,
                email: dto.advisorEmail,
                password: dto.advisorPassword,
                role: {
                    connect: {
                        name: "ADVISOR"
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
                imagePublicId: dto.departmentHeadImagePublicId,
                phoneNum: dto.departmentHeadPhoneNum,
                verified: true,
                email: dto.departmentHeadEmail,
                password: dto.departmentHeadPassword,
                role: {
                    connect: {
                        name: "DEPARTMENT_HEAD"
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
                imagePublicId: dto.deanImagePublicId,
                phoneNum: dto.deanPhoneNum,
                verified: true,
                email: dto.deanEmail,
                password: dto.deanPassword,
                role: {
                    connect: {
                        name: "COLLEGE_DEAN"
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

    async uploadProfilePic(imageFile: Express.Multer.File) {
        const imageUploadPromise = this.cloudinary.uploadImage(imageFile).catch(err => {
            throw new BadRequestException(`Image upload failed: ${err.message}`);
        })
        const uploads = await Promise.all([
            imageUploadPromise
        ]);
        return uploads[0].url;
    }

    async uploadProfilePicAndResume(imageFile?: Express.Multer.File, resumeFile?: Express.Multer.File) {
        // Define a default image URL
        const defaultImageUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709011728/yn7txagp9asfmu5uie7f.jpg';

        // Optionally, define a default or placeholder URL for the resume, if needed
        // For example, if you want to track that no resume was uploaded without causing an error
        const defaultResumeUrl = 'Optional: Define a default resume URL or leave as undefined';

        // Use a ternary operator to decide whether to upload the image or use the default
        const imageUploadPromise = imageFile
            ? this.cloudinary.uploadImage(imageFile).catch(err => {
                throw new BadRequestException(`Image upload failed: ${err.message}`);
            })
            : Promise.resolve({ url: defaultImageUrl }); // If no imageFile, resolve with default image URL

        // Similar handling for the resume file, with an additional check to only upload if provided
        const resumeUploadPromise = resumeFile
            ? this.cloudinary.uploadImage(resumeFile).catch(err => {
                throw new BadRequestException(`Resume upload failed: ${err.message}`);
            })
            : Promise.resolve({ url: defaultResumeUrl }); // Use a default or placeholder URL for resumes, or handle differently as needed

        const uploads = await Promise.all([
            imageUploadPromise,
            resumeUploadPromise
        ]);

        return {
            image: uploads[0].url, // This will be the uploaded image URL or the default image URL
            resume: uploads[1] ? uploads[1].url : undefined // Conditionally return the resume URL if present, adjust based on how you handle default/missing resumes
        };
    }


}
