import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbDiscipline } from '../entities/discipline.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class DisciplineRepository extends PrismaRepository<'discipline', DbDiscipline> {
  constructor (prisma: PrismaService) {
    super(prisma.discipline, {
      subject: true,
      group: {
        include: {
          selectiveAmounts: true,
        },
      },
      disciplineTypes: true,
      disciplineTeachers: {
        include: {
          teacher: {
            include: {
              cathedras: {
                include: {
                  cathedra: true,
                },
              },
            },
          },
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
