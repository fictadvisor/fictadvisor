import { Injectable } from '@nestjs/common';
import { GroupGuard } from './GroupGuard';
import { type Group } from '@prisma/client';
import { type Request } from 'express';
import { PrismaService } from '../../database/PrismaService';
import { GroupService } from '../../api/group/GroupService';

@Injectable()
export class GroupByParamsGuard extends GroupGuard {
  constructor (
    protected prisma: PrismaService,
    protected groupService: GroupService
  ) {
    super(prisma);
  }

  async getGroup (): Promise<Group> {
    const groupId = this.context.switchToHttp().getRequest<Request>().params.groupId;
    return await this.groupService.get(groupId);
  }
}
