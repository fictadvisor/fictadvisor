import { Expose } from 'class-transformer';
import { TeacherCourseSearchIndex } from '../../../database/entities/teacher-course-search-index';
import { assign } from '../../../common/common.object';
import { CourseState } from 'src/database/entities/course.entity';

export class TeacherCourseItemDto {
  id: string;

  link: string;

  name: string;

  @Expose({ name: 'review_count' })
  reviewCount: number;

  state: CourseState;

  rating: number;

  recommended: boolean;

  public static from(v: TeacherCourseSearchIndex): TeacherCourseItemDto {
    return assign(new TeacherCourseItemDto(), {
      id: v.id,
      link: v.link,
      name: v.name,
      state: v.state,
      reviewCount: v.reviewCount,
      rating: v.rating,
      recommended: v.recommended,
    });
  }
}
