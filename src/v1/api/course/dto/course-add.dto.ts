import { Expose } from 'class-transformer';

export class CourseAddDto {
  @Expose({ name: 'teacher_id' })
  teacherId: string;

  @Expose({ name: 'subject_id' })
  subjectId: string;

  description?: string;
}
