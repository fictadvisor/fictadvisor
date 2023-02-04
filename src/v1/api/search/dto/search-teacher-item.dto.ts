import { Expose } from 'class-transformer';
import { TeacherSearchIndex } from '../../../database/entities/teacher-search-index.entity';
import { assign } from '../../../common/common.object';

export class SearchTeacherItemDto {
  id: string;

  link: string;

  @Expose({ name: 'first_name' })
    firstName: string;

  @Expose({ name: 'middle_name' })
    middleName?: string;

  @Expose({ name: 'last_name' })
    lastName: string;

  rating: number;

  public static from (i: TeacherSearchIndex): SearchTeacherItemDto {
    return assign(new SearchTeacherItemDto(), {
      id: i.id,
      link: i.link,
      firstName: i.firstName,
      middleName: i.middleName,
      lastName: i.lastName,
      rating: i.rating,
    });
  }
}
