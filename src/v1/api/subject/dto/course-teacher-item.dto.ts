import { Expose } from 'class-transformer';

export class CourseTeacherItemDto {
  id: string;

  link: string;

  @Expose({ name: 'first_name' })
    firstName: string;

  @Expose({ name: 'middle_name' })
    middleName?: string;

  @Expose({ name: 'last_name' })
    lastName?: string;
}
