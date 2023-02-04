import { Expose } from 'class-transformer';
import { assign } from 'src/v1/common/common.object';
import {
  Teacher,
  TEACHER_IMAGE_PLACEHOLDER,
} from 'src/v1/database/entities/teacher.entity';

export class CourseTeacherDto {
  id: string;

  link: string;

  @Expose({ name: 'first_name' })
    firstName: string;

  @Expose({ name: 'middle_name' })
    middleName?: string;

  @Expose({ name: 'last_name' })
    lastName?: string;

  image?: string;

  public static from (t: Teacher) {
    return assign(new CourseTeacherDto(), {
      id: t.id,
      link: t.link,
      firstName: t.firstName,
      middleName: t.middleName,
      lastName: t.lastName,
      image: t.image ?? TEACHER_IMAGE_PLACEHOLDER,
    });
  }
}
