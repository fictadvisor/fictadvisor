import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbGroup } from '../entities/group.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class GroupRepository extends PrismaRepository<'group', DbGroup> {
  constructor (prisma: PrismaService) {
    super(prisma.group, {
      // getSelectivesBySemesters maps this straight into the response, so the
      // order is user-visible; every other consumer only does a lookup.
      selectiveAmounts: {
        orderBy: [{ year: 'asc' }, { semester: 'asc' }],
      },
      telegramGroups: true,
      cathedra: true,
      educationalProgram: {
        include: {
          speciality: true,
        },
      },
      students: {
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      },
    });
  }
}
