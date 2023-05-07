import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestUtils } from '../../utils/RequestUtils';
// import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';

@Injectable()
export class GroupBySemesterLessonGuard implements CanActivate {
  constructor (
    // private scheduleRepository: ScheduleRepository,
  ) {}

  async canActivate (context: ExecutionContext): Promise<any> {
    // const request = context.switchToHttp().getRequest<Request>();
    // const lessonId = RequestUtils.get(request, 'lessonId');
    // const lesson = await this.scheduleRepository.getSemesterLesson(lessonId);
    // request.query.groupId = lesson.disciplineType.discipline.group.id;
    //
    // return true;
  }
}
