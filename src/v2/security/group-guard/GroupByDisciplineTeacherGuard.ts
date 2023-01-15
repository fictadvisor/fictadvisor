import { Injectable } from '@nestjs/common';
import { GroupGuard } from './GroupGuard';
import { PrismaService } from '../../database/PrismaService';
import { Group } from '@prisma/client';
import { Request } from 'express';
import { DisciplineTeacherService } from '../../api/teacher/DisciplineTeacherService';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByDisciplineTeacherGuard extends GroupGuard {

  constructor(
    protected prisma: PrismaService,
    private disciplineTeacherService: DisciplineTeacherService,
  ) {
    super(prisma);
  }

  async getGroup(): Promise<Group> {
    const request = this.context.switchToHttp().getRequest<Request>();
    const disciplineTeacherId = RequestUtils.get(request, 'disciplineTeacherId');
    return this.disciplineTeacherService.getGroup(disciplineTeacherId);
  }
}