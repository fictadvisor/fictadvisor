import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbTeacher } from '../entities/teacher.entity';
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
