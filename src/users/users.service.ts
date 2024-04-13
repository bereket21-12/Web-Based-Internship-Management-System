import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dtos';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async createStaffUser(createUserDto: CreateUserDto): Promise<any> {
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
                password: createUserDto.userPassword,
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
                password: updateUserDto.userPassword,
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
}
