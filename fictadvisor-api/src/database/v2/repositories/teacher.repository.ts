import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbTeacher } from '../entities/teacher.entity';
import { Include, PrismaRepository } from '../prisma.repository';

// Exactly what TeacherWithRolesAndCathedrasResponse reads: the cathedras and
// the distinct discipline types across a teacher's roles. The repository's own
// include drags every discipline_teacher row's discipline (and every column of
// every role) along with it — ~190 KB of throwaway objects per teacher, which
// on the unpaginated list of 600+ teachers is ~120 MB of garbage for a 200 KB
// response. Pass this wherever only the roles are mapped.
export const TEACHER_ROLES_INCLUDE: Include<'teacher'> = {
  cathedras: {
    include: {
      cathedra: true,
    },
  },
  disciplineTeachers: {
    select: {
      roles: {
        select: {
          disciplineType: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  },
};

// Scalar columns only, for callers that never touch a relation.
export const TEACHER_NO_RELATIONS: Include<'teacher'> = {
  cathedras: false,
  disciplineTeachers: false,
};

@Injectable()
export class TeacherRepository extends PrismaRepository<'teacher', DbTeacher> {
  constructor (prisma: PrismaService) {
    super(prisma.teacher, {
      cathedras: {
        include: {
          cathedra: true,
        },
      },
      disciplineTeachers: {
        include: {
          discipline: true,
          roles: {
            include: {
              disciplineType: true,
            },
          },
        },
      },
    });
  }
}
