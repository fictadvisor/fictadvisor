import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbDisciplineTeacher } from '../entities/discipline-teacher.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class DisciplineTeacherRepository extends PrismaRepository<'disciplineTeacher', DbDisciplineTeacher> {
  // Relations the discipline-teacher response mappers read (discipline+group+
  // subject+types, roles+type, teacher+cathedras). Callers that only need
  // roles, a scalar, or existence pass a narrower include or none.
  static readonly responseInclude: Prisma.DisciplineTeacherInclude = {
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
  };

  // Just the roles + their type — used by schedule/parser role checks.
  static readonly rolesInclude: Prisma.DisciplineTeacherInclude = {
    roles: {
      include: {
        disciplineType: true,
      },
    },
  };

  constructor (prisma: PrismaService) {
    // No global include: callers pass only the relations they need.
    super(prisma.disciplineTeacher);
  }
}
