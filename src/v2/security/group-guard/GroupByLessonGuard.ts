import { GroupGuard } from './GroupGuard';
import { type DisciplineType, type Group } from '@prisma/client';
import { type Request } from 'express';
import { type PrismaService } from '../../database/PrismaService';
import { type DisciplineService } from '../../api/discipline/DisciplineService';
import { type GroupService } from '../../api/group/GroupService';

export abstract class GroupByLessonGuard extends GroupGuard {
  protected disciplineService: DisciplineService;
  protected groupService: GroupService;

  protected constructor (
    prisma: PrismaService,
    disciplineService: DisciplineService,
    groupService: GroupService
  ) {
    super(prisma);
    this.disciplineService = disciplineService;
    this.groupService = groupService;
  }

  async getGroup (): Promise<Group> {
    const lessonId = this.context.switchToHttp().getRequest<Request>().params.lessonId;

    const disciplineType = await this.getDisciplineType(lessonId);
    if (!disciplineType) return null;
    const discipline = await this.disciplineService.get(disciplineType.disciplineId);

    return await this.groupService.get(discipline.groupId);
  }

  abstract getDisciplineType (lessonId: string): Promise<DisciplineType>
}
