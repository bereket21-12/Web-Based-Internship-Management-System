import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/common/constants/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { AtGuard, RoleGuard } from 'src/common/guards';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private cloudinaryService: CloudinaryService
    ) { }

    private static defaultImageUrl = '';
    private static defaultImagePublicId = '';
    @Get("assign")
    async notHeadandDeanuser(){
        return await this.userService.getNotDeanandHeadUser()
    }
        
    @Get("role")
    async user(){
        return await this.userService.getNormalUser()
    }

    @Get("head")
    async head(){
        return await this.userService.getDEPARTMENT_HEAD()
    }

    @Get("dean")
    async dean(){
        return await this.userService.getCOLLEGE_DEAN()
    }

    @Get("university/:id")
    async Universityuser(@Param('id') id: string){
        console.log("univesity Users")
        return await this.userService.getAllUnivesityUsers(id)
    }
    @Post(":id")
 //   @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
 //   @UseGuards(AtGuard, RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createUser(@Body() user: any, @UploadedFile() image: Express.Multer.File ,@Param('id') id:any) {
        try {
            let deanProfilePic = UsersController.defaultImageUrl;
            let imagePublicId = UsersController.defaultImagePublicId;

            if (image) {
                const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                    throw new BadRequestException(`Image upload failed: ${err.message}`);
                });
                imagePublicId = imageFile.public_id;
                deanProfilePic = imageFile.url;
            }

            user.profilePic = imagePublicId;
            user.profilePicPublicId = deanProfilePic;
            console.log(id)
            return await this.userService.createStaffUser(user,id);
        } catch (err) {
            throw new Error(err);
        }
    }

    @Get()
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR, Role.STUDENT, Role.ADVISOR, Role.COLLEGE_DEAN, Role.MENTOR, Role.DEPARTMENT_HEAD)
    @UseGuards(AtGuard, RoleGuard)
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id);
    }

    @Patch(':id')
    // @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR, Role.STUDENT, Role.ADVISOR, Role.COLLEGE_DEAN, Role.MENTOR, Role.DEPARTMENT_HEAD)
    // @UseGuards(AtGuard, RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(@Body() user: any, @Param('id') id: string, @UploadedFile() image: Express.Multer.File) {
        if (image) {
            const imageFile = await this.cloudinaryService.uploadImage(image).catch(err => {
                throw new BadRequestException(`Image upload failed: ${err.message}`);
            });
            user.profilePic = imageFile.public_id;
            user.profilePicPublicId = imageFile.url;
        }
        return await this.userService.updateUser(user, id);
    }

    @Patch(':id/verify')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    async verifyUser(@Param('id') id: string) {
        return await this.userService.verifyUser(id);
    }

    @Delete(':id')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    async deleteUser(@Param('id') id: string) {

        return await this.userService.deleteUser(id);
    }

    @Post(':userId/assign/:roleName')
    async assignRoleToUser(@Param('userId') userId: string, @Param('roleName') roleName: string) {

        return this.userService.assignRoleToUser(userId, roleName);
    }

}
