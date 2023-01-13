import { Injectable } from '@nestjs/common';
import { GroupGuard } from './GroupGuard';
import { PrismaService } from '../../database/PrismaService';
import { GroupService } from '../../api/group/GroupService';
import { Group } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class GroupByDisciplineGuard extends GroupGuard {

  constructor(
    protected prisma: PrismaService,
    protected groupService: GroupService,
  ) {
    super(prisma);
  }

  async getGroup(): Promise<Group> {
    const disciplineId = this.context.switchToHttp().getRequest<Request>().params['disciplineId'];
    return await this.groupService.getByDiscipline(disciplineId);
  }
}