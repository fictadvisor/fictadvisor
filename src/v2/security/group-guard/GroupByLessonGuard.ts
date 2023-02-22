import { GroupGuard } from './GroupGuard';
import { DisciplineType, Group } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from '../../database/PrismaService';
import { DisciplineService } from '../../api/discipline/DisciplineService';
import { GroupService } from '../../api/group/GroupService';

export abstract class GroupByLessonGuard extends GroupGuard {

  protected disciplineService: DisciplineService;
  protected groupService: GroupService;

  protected constructor (
    prisma: PrismaService,
    disciplineService: DisciplineService,
    groupService: GroupService,
  ) {
    super(prisma);
    this.disciplineService = disciplineService;
    this.groupService = groupService;
  }

  async getGroup (): Promise<Group> {
    const lessonId = this.context.switchToHttp().getRequest<Request>().params['lessonId'];

    const disciplineType = await this.getDisciplineType(lessonId);
    if (!disciplineType) return null;
    const discipline = await this.disciplineService.get(disciplineType.disciplineId);

    return discipline.group;
  }

  abstract getDisciplineType(lessonId: string): Promise<DisciplineType>;
}