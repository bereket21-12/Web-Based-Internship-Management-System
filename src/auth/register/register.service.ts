import { BadRequestException, Injectable } from '@nestjs/common';
import { UniversityRegisterDto } from 'src/common/dtos/university-register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';
import { Tokens } from 'src/common/types';
import { GenerateJwtService } from '../jwt/generate.jwt.service';
import { StudentRegistrationDto } from 'src/common/dtos/student-register.dto';
import { CompanyRegistrationDto } from 'src/common/dtos/company-register.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class RegisterService {
    constructor(
        private prismaService: PrismaService,
        private generateJwtService: GenerateJwtService,
        private cloudinary: CloudinaryService,
    ) { }

    async registerUniversity(dto: UniversityRegisterDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.adminPassword)

        const newUniversity = await this.prismaService.university.create({
            data: {
                name: dto.universityName,
                email: dto.universityEmail,
                phoneNum: dto.universityPhoneNumber,
                websiteUrl: dto.websiteUrl,
                logoUrl: dto.universityLogoUrl,
                logoPublicId: dto.logoPublicId,
                address: dto.address,
                universityAdmin: {
                    create: {
                        userName: dto.adminUserName,
                        email: dto.adminEmail,
                        password: hashedPassword,
                        firstName: dto.adminFirstName,
                        middleName: dto.adminMiddleName,
                        profilePic: dto.adminProfilePicture,
                        imagePublicId: dto.adminImagePublicId,
                        phoneNum: dto.adminPhoneNumber,
                        roleName: 'UNIVERSITY_ADMIN',
                    },
                }
            }
        })

        const tokens = await this.generateJwtService.getToken(newUniversity.id, dto.adminEmail, 'UNIVERSITY_ADMIN');
        await this.updateRtHash(newUniversity.universityAdminId, tokens.refresh_token);
        return tokens;
    }

    async registerCompany(dto: CompanyRegistrationDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.HRPassword)

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
                    create: {
                        userName: dto.HRUserName,
                        email: dto.HREmail,
                        password: hashedPassword,
                        firstName: dto.HRFirstName,
                        middleName: dto.HRMiddleName,
                        profilePic: dto.HRProfilePicture,
                        imagePublicId: dto.HRImagePublicId,
                        phoneNum: dto.HRPhoneNumber,
                        roleName: 'COMPANY_HR',
                    },
                }
            }
        })

        const tokens = await this.generateJwtService.getToken(newCompany.id, dto.HREmail, 'COMPANY_HR');
        await this.updateRtHash(newCompany.companyHRId, tokens.refresh_token);
        return tokens;
    }

    async registerStudent(dto: StudentRegistrationDto): Promise<Tokens> {
        const hashedPassword = await argon.hash(dto.password)

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
                Student: {
                    create: {
                        universityName: dto.universityName,
                        departmentName: dto.departmentName,
                        year: dto.year,
                        gpa: dto.gpa,
                        skills: dto.skills,
                        resumeUrl: dto.resumeUrl,
                    },
                },
            },
        });


        const tokens = await this.generateJwtService.getToken(newStudent.id, dto.email, 'STUDENT');
        await this.updateRtHash(newStudent.id, tokens.refresh_token);
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
