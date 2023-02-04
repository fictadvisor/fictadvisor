import { Expose } from 'class-transformer';
import { SubjectView } from '../../../database/entities/subject-view.entity';
import { assign } from '../../../common/common.object';
import { SubjectState } from '../../../database/entities/subject.entity';

export class SubjectDto {
  id: string;

  link: string;

  name: string;

  description?: string;

  @Expose({ name: 'teacher_count' })
    teacherCount: number;

  rating: number;

  state: SubjectState;

  @Expose({ name: 'created_at' })
    createdAt: Date;

  @Expose({ name: 'updated_at' })
    updatedAt: Date;

  public static from (v: SubjectView) {
    return assign(new SubjectDto(), {
      id: v.id,
      link: v.link,
      name: v.name,
      description: v.description,
      teacherCount: v.teacherCount,
      state: v.state,
      rating: v.rating,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
    });
  }
}
