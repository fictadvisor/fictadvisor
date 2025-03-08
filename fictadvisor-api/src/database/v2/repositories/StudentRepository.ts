import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbStudent } from '../entities/DbStudent';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class StudentRepository extends PrismaRepository<'student', DbStudent> {
  constructor (prisma: PrismaService) {
    super(prisma.student, {
      group: {
        include: {
          cathedra: true,
          educationalProgram: {
            include: {
              speciality: true,
            },
          },
        },
      },
      roles: {
        include: {
          role: true,
        },
      },
      selectiveDisciplines: {
        include: {
          discipline: true,
        },
      },
      user: true,
    });
  }
}
