import { Expose } from 'class-transformer';
import { type SubjectSearchIndex } from '../../../database/entities/subject-search-index';
import { assign } from '../../../common/common.object';
import { type SubjectState } from '../../../database/entities/subject.entity';

export class SubjectItemDto {
  id: string;

  link: string;

  name: string;

  description?: string;

  @Expose({ name: 'teacher_count' })
    teacherCount: number;

  rating: number;

  state: SubjectState;

  public static from (i: SubjectSearchIndex): SubjectItemDto {
    return assign(new SubjectItemDto(), {
      id: i.id,
      link: i.link,
      name: i.name,
      description: i.description,
      teacherCount: i.teacherCount,
      rating: i.rating,
    });
  }
}
