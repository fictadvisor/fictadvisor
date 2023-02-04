import { Injectable } from '@nestjs/common';
import { GroupGuard } from './GroupGuard';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client';
import { Request } from 'express';
import { DisciplineRepository } from '../../api/discipline/DisciplineRepository';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByDisciplineGuard extends GroupGuard {

  constructor (
    protected prisma: PrismaService,
    private disciplineRepository: DisciplineRepository,
  ) {
    super(prisma);
  }

  async getGroup (): Promise<Group> {
    const request = this.context.switchToHttp().getRequest<Request>();
    const disciplineId = RequestUtils.get(request, 'disciplineId');
    return await this.disciplineRepository.getGroup(disciplineId);
  }
}