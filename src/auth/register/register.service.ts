import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';
import { Tokens } from 'src/common/types';
import { GenerateJwtService } from '../jwt/generate.jwt.service';
import { StudentRegistrationDto } from 'src/common/dtos/student-register.dto';
import { CompanyRegistrationDto } from 'src/common/dtos/company-register.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { collegeRegisterDto } from 'src/common/dtos/college.dto';
import { departmentRegisterDto } from 'src/common/dtos/department.dto';

@Injectable()
export class RegisterService {
    constructor(
        private prismaService: PrismaService,
        private generateJwtService: GenerateJwtService,
        private cloudinary: CloudinaryService,
    ) { }

    async registerUniversity(dto: any): Promise<Tokens> {
        try {
            const hashedPassword = await argon.hash(dto.adminPassword);
    
            // Create a new user for university admin
            const newAdminUser = await this.prismaService.user.create({
                data: {
                    userName: dto.adminUserName,
                    email: dto.adminEmail,
                    password: hashedPassword,
                    firstName: dto.adminFirstName,
                    middleName: dto.adminMiddleName,
                    profilePic: dto.adminProfilePicture,
                    imagePublicId: dto.adminImagePublicId,
                    phoneNum: dto.adminPhoneNumber,
                    roleName: 'UNIVERSITY_ADMIN'
                }
            });
    
            // Check if the new user was created successfully
            if (!newAdminUser || !newAdminUser.id) {
                throw new Error('Failed to create university admin user.');
            }
    
            // Create a new university and connect it to the admin user
            const newUniversity = await this.prismaService.university.create({
                data: {
                    universityAdmin: {
                        connect: {
                            id: newAdminUser.id
                        }
                    },
                    name: dto.universityName,
                    email: dto.universityEmail,
                    phoneNum: dto.universityPhoneNumber,
                    websiteUrl: dto.websiteUrl,
                    logoUrl: dto.universityLogoUrl,
                    logoPublicId: dto.logoPublicId,
                    address: dto.address
                }
            });
    
            // Check if the new university was created successfully
            if (!newUniversity || !newUniversity.id) {
                throw new Error('Failed to create university.');
            }
    
            // Generate tokens for the admin user
            const tokens = await this.generateJwtService.getToken(newAdminUser.id, dto.adminEmail, 'UNIVERSITY_ADMIN');
    
            // Update refresh token hash for the admin user
            await this.updateRtHash(newAdminUser.id, tokens.refresh_token);
    
            return tokens;
        } catch (error) {
            // Handle any errors
            console.error('Error registering university:', error);
            throw error;
        }
    }
    
    

    async registerCompany(dto: CompanyRegistrationDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.HRPassword)

        const newHR = await this.prismaService.user.create({
            data: {
                userName: dto.HRUserName,
                email: dto.HREmail,
                password: hashedPassword,
                firstName: dto.HRFirstName,
                middleName: dto.HRMiddleName,
                profilePic: dto.HRProfilePicture,
                imagePublicId: dto.HRImagePublicId,
                phoneNum: dto.HRPhoneNumber,
                roleName: 'COMPANY_HR',
            }
        })

        const newCompany = await this.prismaService.company.create({
            data: {
                name: dto.companyName,
                email: dto.companyEmail,
                phoneNum: dto.companyPhoneNum,
                website: dto.website,
                logoUrl: dto.logoUrl,
                logoPublicId: dto.logoPublicId,
                industry: dto.industryType,
                address: dto.address,
                companyHR: {
                    connect: {
                        id: newHR.id
                    }
                }
            }
        })

        const tokens = await this.generateJwtService.getToken(newCompany.id, dto.HREmail, 'COMPANY_HR');
        // await this.updateRtHash(newCompany.companyHRId, tokens.refresh_token);
        return tokens;
    }

    async registerStudent(dto: StudentRegistrationDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.password)

        const university = dto.universityName ? await this.prismaService.university.findUnique({
            where: { name: dto.universityName },
        }) : null;

        const department = dto.departmentName ? await this.prismaService.department.findUnique({
            where: { name: dto.departmentName },
        }) : null;

        const newStudent = await this.prismaService.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                firstName: dto.firstName,
                middleName: dto.middleName,
                userName: dto.userName,
                profilePic: dto.profilePic,
                imagePublicId: dto.imagePublicId,
                phoneNum: dto.phoneNum,
                roleName: 'STUDENT',
                verified: dto.verified ?? false,
            },
        });

        const student = await this.prismaService.student.create({
            data: {
                user: {
                    connect: {
                        id: newStudent.id
                    }
                },
                University: {
                    connect: {
                        id: university?.id
                    }
                },
                department: {
                    connect: {
                        id: department?.id
                    }
                },
                year: Number(dto.year),
                gpa: Number(dto.gpa),
                skills: dto.skills,
                resumeUrl: dto.resumeUrl,
            }
        })

        const tokens = await this.generateJwtService.getToken(student.id, dto.email, 'STUDENT');
        // await this.updateRtHash(student.id, tokens.refresh_token);
        console.log(tokens)
        return tokens;
    }

    async updateRtHash(userId: string, rtHash: string) {
        const hash = await argon.hash(rtHash);
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }

   

    async registerDepartment(dto :departmentRegisterDto){

        try {
            
            await  this.prismaService.department.create({

                data:{
                    name:dto.name,
                    email:dto.email,
                    phoneNum:dto.phoneNum,
                    University :{
                        connect: {
                            id: dto.universityId
                        }
                },
                college :{
                    connect: {
                        id: dto.collegeId
                    }
            }
            }})
            
        } catch (error) {
            console.log(error)
            
        }



}

    // async uploadProfilePicAndResume(imageFile?: Express.Multer.File, logoFile?: Express.Multer.File) {
    //     // Define a default image URL
    //     const defaultImageUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709011728/yn7txagp9asfmu5uie7f.jpg';
    //     const defaultImageId = 'yn7txagp9asfmu5uie7f';
    //     const logoUrl = 'https://res.cloudinary.com/dtwxnkgdf/image/upload/v1709102607/d2lzd65x1idyztuz2afq.jpg'
    //     const logoId = 'd2lzd65x1idyztuz2afq';

    //     // Use a ternary operator to decide whether to upload the image or use the default
    //     const imageUploadPromise = imageFile
    //         ? this.cloudinary.uploadImage(imageFile).catch(err => {
    //             throw new BadRequestException(`Image upload failed: ${err.message}`);
    //         })
    //         : Promise.resolve({ url: defaultImageUrl, publicId: defaultImageId }); // If no imageFile, resolve with default image URL

    //     // Similar handling for the resume file, with an additional check to only upload if provided
    //     const logoUploadPromise = logoFile
    //         ? this.cloudinary.uploadImage(logoFile).catch(err => {
    //             throw new BadRequestException(`Resume upload failed: ${err.message}`);
    //         })
    //         : Promise.resolve({ url: logoUrl, publicId: logoId }); // Use a default or placeholder URL for resumes, or handle differently as needed

    //     const uploads = await Promise.all([
    //         imageUploadPromise,
    //         logoUploadPromise
    //     ]);

    //     return uploads;
    // }
}
