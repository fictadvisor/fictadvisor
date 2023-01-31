import { Injectable } from '@nestjs/common';
import { GroupGuard } from './GroupGuard';
import { PrismaService } from '../../database/PrismaService';
import { type Group } from '@prisma/client';
import { type Request } from 'express';
import { DisciplineTeacherService } from '../../api/teacher/DisciplineTeacherService';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByDisciplineTeacherGuard extends GroupGuard {
  constructor (
    protected prisma: PrismaService,
    private readonly disciplineTeacherService: DisciplineTeacherService
  ) {
    super(prisma);
  }

  async getGroup (): Promise<Group> {
    const request = this.context.switchToHttp().getRequest<Request>();
    const disciplineTeacherId = RequestUtils.get(request, 'disciplineTeacherId');
    return await this.disciplineTeacherService.getGroup(disciplineTeacherId);
  }
}
