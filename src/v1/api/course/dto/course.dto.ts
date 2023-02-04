import { Expose } from 'class-transformer';
import { assign } from 'src/v1/common/common.object';
import { Course, CourseState } from 'src/v1/database/entities/course.entity';
import { CourseTeacherDto } from './course-teacher.dto';

export class CourseDto {
  id: string;

  link: string;

  @Expose({ name: 'subject_link' })
    subjectLink: string;

  teacher: CourseTeacherDto;

  name: string;

  rating: number;

  description: string;

  state: CourseState;

  @Expose({ name: 'created_at' })
    createdAt: Date;

  @Expose({ name: 'updated_at' })
    updatedAt: Date;

  public static from (c: Course) {
    return assign(new CourseDto(), {
      id: c.id,
      link: c.link,
      subjectLink: c.subject?.link,
      teacher: CourseTeacherDto.from(c.teacher),
      name: c.subject.name,
      rating: null,
      state: c.state,
      description: c.description,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    });
  }
}
