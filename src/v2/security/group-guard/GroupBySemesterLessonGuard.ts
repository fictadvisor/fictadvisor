import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class GroupBySemesterLessonGuard implements CanActivate {

  async canActivate (): Promise<any> {
  // const lesson = await this.scheduleRepository.getSemesterLesson(lessonId);
  //   if (!lesson) {
  //     throw new InvalidLessonIdException();
  //   }
  //   return lesson.disciplineType;
  }
}