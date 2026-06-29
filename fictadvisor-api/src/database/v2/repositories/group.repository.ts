import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbGroup } from '../entities/group.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class GroupRepository extends PrismaRepository<'group', DbGroup> {
  constructor (prisma: PrismaService) {
    super(prisma.group, {
      selectiveAmounts: true,
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
