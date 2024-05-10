import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { compileFunction } from 'vm';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}


  async getCompanies() {
    return await this.prismaService.company.findMany();
  }

  async getCompanyById(id: string) {
    return await this.prismaService.company.findUnique({
      where: {
        id,
      },
    });
  }

  async getCountCompanyForDep(id: string) {
    const comapny = await this.prismaService.departmentCompany.findMany({
      where: {
        departmentId: id,
      },
    });

    return comapny.length;
  }
  async getInternshipsByCompanyId(id: string) {
    return await this.prismaService.internship.findMany({
      where: {
        companyId: id,
      },
    });
  }



    async findCompanyByUserId(userId: string) {
        const result = await this.prismaService.company.findFirst({ // we use findeFirst instead of findUnique because we want to return null if the company is not found. The difference between select and include is that select is used to select the fields that we want to return, while include is used to include the related fields in the response.
            where: {
                companyHRId: userId
            },
            select: {
                id: true,
            }
        })

        console.log(result)
        return result
    }
  async findStudentsByCompanyId(companyId: string) {
    return await this.prismaService.student.findMany({
      where: {
        Application: {
          // This is the name of the relation in the Prisma schema
          some: {
            // This is the Prisma filter that checks if at least one record in the relation meets the condition
            internship: {
              companyId: companyId,
            },
          },
        },
      },
    });
  }
}
