import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { DbTeacher } from '../entities/DbTeacher';
import { PrismaRepository } from '../prisma.repository';

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
