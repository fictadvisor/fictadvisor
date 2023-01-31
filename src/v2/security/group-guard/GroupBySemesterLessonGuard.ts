import { Injectable } from '@nestjs/common';
import { GroupByLessonGuard } from './GroupByLessonGuard';
import { PrismaService } from '../../database/PrismaService';
import { DisciplineService } from '../../api/discipline/DisciplineService';
import { GroupService } from '../../api/group/GroupService';
import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';
import { DisciplineType } from '@prisma/client';
import { InvalidLessonIdException } from '../../utils/exceptions/InvalidLessonIdException';

@Injectable()
export class GroupBySemesterLessonGuard extends GroupByLessonGuard {

  constructor(
    protected prisma: PrismaService,
    protected disciplineService: DisciplineService,
    protected groupService: GroupService,
    private scheduleRepository: ScheduleRepository,
  ) {
    super(prisma, disciplineService, groupService);
  }

  async getDisciplineType(lessonId: string): Promise<DisciplineType> {
    const lesson = await this.scheduleRepository.getSemesterLesson(lessonId);
    if (!lesson) {
      throw new InvalidLessonIdException();
    }
    return lesson.disciplineType;
  }

}