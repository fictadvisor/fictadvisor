import { GroupByLessonGuard } from './GroupByLessonGuard';
import { Injectable } from '@nestjs/common';
import { GroupService } from '../../api/group/GroupService';
import { PrismaService } from '../../database/PrismaService';
import { DisciplineService } from '../../api/discipline/DisciplineService';
import { type DisciplineType } from '@prisma/client';
import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';

@Injectable()
export class GroupByTemporaryLessonGuard extends GroupByLessonGuard {
  constructor (
    protected prisma: PrismaService,
    protected disciplineService: DisciplineService,
    protected groupService: GroupService,
    private readonly scheduleRepository: ScheduleRepository
  ) {
    super(prisma, disciplineService, groupService);
  }

  async getDisciplineType (lessonId: string): Promise<DisciplineType> {
    const lesson = await this.scheduleRepository.getTemporaryLesson(lessonId);
    return lesson.disciplineType;
  }
}
