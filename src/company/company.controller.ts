import { CompanyService } from './company.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/constants/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { AtGuard, RoleGuard } from 'src/common/guards';


@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService,
    ) { }

    @Get()
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    getCompanies() {
        return this.companyService.getCompanies();
    }

    @Get(':id')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    getCompanyById(@Param('id') id: string) {
        return this.companyService.getCompanyById(id);
    }

    @Get(':id/internships')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    getInternshipsByCompanyId(@Param('id') id: string) {
        return this.companyService.getInternshipsByCompanyId(id);
    }

    @Get(':companyId/students')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    getInternsByCompanyId(@Param('companyId') companyId: string) {
        return this.companyService.findStudentsByCompanyId(companyId);
    }

    @Get('?userId')
    // @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    // @UseGuards(AtGuard, RoleGuard)
    getCompanyByUserId(@Query('userId') userId: string) {
        console.log(userId, ' userId from controller')
        return this.companyService.findCompanyByUserId(userId);
    }

    @Get('interns/?companyId')
    @Roles(Role.UNIVERSITY_ADMIN, Role.SYSTEM_ADMIN, Role.COMPANY_HR)
    @UseGuards(AtGuard, RoleGuard)
    getInterns(@Query('companyId') companyId: string) {
        return this.companyService.findStudentsByCompanyId(companyId);
    }
}
