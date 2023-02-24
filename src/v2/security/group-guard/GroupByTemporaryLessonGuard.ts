import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class GroupByTemporaryLessonGuard implements CanActivate {

  async canActivate (): Promise<any> {
    // const lesson = await this.scheduleRepository.getTemporaryLesson(lessonId);
    // return lesson.disciplineType;
  }
}