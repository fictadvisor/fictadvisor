import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { ScheduleRepository } from '../../api/schedule/ScheduleRepository';
import { Request } from 'express';
import { RequestUtils } from '../../utils/RequestUtils';

@Injectable()
export class GroupByTemporaryLessonGuard implements CanActivate {
  constructor (
    // private scheduleRepository: ScheduleRepository,
  ) {}

  async canActivate (context: ExecutionContext): Promise<any> {
    // const request = context.switchToHttp().getRequest<Request>();
    // const lessonId = RequestUtils.get(request, 'lessonId');
    // const lesson = await this.scheduleRepository.getTemporaryLesson(lessonId);
    // request.query.groupId = lesson.disciplineType.discipline.group.id;
    //
    // return true;
  }
}
