import { assign } from 'src/v1/common/common.object';
import { TeacherReviewView } from 'src/v1/database/entities/review-view.entity';

export class ReviewCourseDto {
  id: string;

  name: string;

  link: string;

  public static from(c: TeacherReviewView) {
    return assign(new ReviewCourseDto(), {
      id: c.id,
      name: c.courseName,
      link: c.courseLink,
    });
  }
}
