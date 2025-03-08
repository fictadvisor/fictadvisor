import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbDisciplineTeacher } from '../entities/DbDisciplineTeacher';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class DisciplineTeacherRepository extends PrismaRepository<'disciplineTeacher', DbDisciplineTeacher> {
  constructor (prisma: PrismaService) {
    super(prisma.disciplineTeacher, {
      discipline: {
        include: {
          group: true,
          subject: true,
          disciplineTypes: true,
        },
      },
      roles: {
        include: {
          disciplineType: true,
        },
      },
      teacher: {
        include: {
          cathedras: {
            include: {
              cathedra: true,
            },
          },
        },
      },
    });
  }
}
