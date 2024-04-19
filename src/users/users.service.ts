import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async createStaffUser(createUserDto: CreateUserDto): Promise<any> {

        const hashedPassword = await argon.hash(createUserDto.userPassword);

        const newStaffUser = await this.prismaService.user.create({
            data: {
                firstName: createUserDto.firstName,
                middleName: createUserDto.middleName,
                userName: createUserDto.userName,
                profilePic: createUserDto.profilePic,
                imagePublicId: createUserDto.profilePicPublicId,
                phoneNum: createUserDto.phoneNum,
                verified: false,// since verified is optional and can be verified later by the admin we set it to false
                email: createUserDto.email,
                password: hashedPassword,
                roleName: createUserDto.roleName
            }
        })
        return newStaffUser;
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

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<any> {
        const hashedPassword = await argon.hash(updateUserDto.userPassword);

        const updatedUser = await this.prismaService.user.update({
            where: {
                id: id
            },
            data: {
                firstName: updateUserDto.firstName,
                middleName: updateUserDto.middleName,
                userName: updateUserDto.userName,
                profilePic: updateUserDto.profilePic,
                imagePublicId: updateUserDto.profilePicPublicId,
                phoneNum: updateUserDto.phoneNum,
                verified: updateUserDto.userVerified,
                email: updateUserDto.email,
                password: hashedPassword,
            }
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
    async getNormalUser(): Promise<any> {
        const usersWithoutRole = await this.prismaService.user.findMany({
            where: {
                OR: [
                    { role: null },
                    { roleName: null }
                ]
            }
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

