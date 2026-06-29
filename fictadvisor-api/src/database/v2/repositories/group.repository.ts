import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client/fictadvisor';
import { PrismaService } from '../prisma.service';
import { DbGroup } from '../entities/group.entity';
import { PrismaRepository } from '../prisma.repository';

@Injectable()
export class GroupRepository extends PrismaRepository<'group', DbGroup> {
  // Relations the group response mappers read (students+roles, cathedra,
  // educationalProgram→speciality, telegramGroups, selectiveAmounts). Callers
  // that only need scalars/existence pass no include.
  static readonly responseInclude: Prisma.GroupInclude = {
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
  };

  constructor (prisma: PrismaService) {
    // No global include: callers pass only the relations they need.
    super(prisma.group);
  }
}
