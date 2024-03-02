export class CreateInternship {
    title: string;
    companyId: string;
    duration: string;
    startDate: Date;
    endDate: Date;
    schedule: Schedule;
    compensations: Compensations;
    description: InternshipDescription;

}

export class InternshipDescription {
    responsibilities: string[];
    qualifications: string[];
    applicationInstructions: string;
    deadline: Date;
}

export enum Schedule {
    FULL_TIME = 'FULL_TIME',
    PART_TIME = 'PART_TIME',
    REMOTE = 'REMOTE'
}

export enum Compensations {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}
/*
model Internship {
  id                      String                @id @default(auto()) @map("_id") @db.ObjectId
  title                   String
  companyId               String                @db.ObjectId
  company                 Company               @relation(fields: [companyId], references: [id])
  duration                String
  startDate               DateTime
  endDate                 DateTime
  schedule                Schedule
  compensations           Compensations
  descriptionId           String                @unique
  description             InternshipDescription @relation(fields: [internshipDescriptionId], references: [id])
  createdAt               DateTime              @default(now())
  updatedAt               DateTime              @updatedAt
  internshipDescriptionId String                @unique @db.ObjectId
  Report                  Report[]
}

model InternshipDescription {
  id                      String      @id @default(auto()) @map("_id") @db.ObjectId
  responsibilities        String[]
  qualifications          String[]
  applicationInstructions String
  deadline                DateTime
  createdAt               DateTime    @default(now())
  updatedAt               DateTime    @updatedAt
  Internship              Internship?
}

enum Schedule {
  FULL_TIME
  PART_TIME
  REMOTE
}

enum Compensations {
  PAID
  UNPAID
}

*/