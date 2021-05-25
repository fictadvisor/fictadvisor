import { assign } from 'src/common/common.object';
import { TeacherReviewView } from 'src/database/entities/review-view.entity';
import { ReviewCourseDto } from './review-course.dto';

export class TeacherReviewDto {
  id: string;

  content: string;

  course: ReviewCourseDto;

  rating: number;

  date: Date;

  public static from(e: TeacherReviewView) {
    return assign(new TeacherReviewDto(), {
      id: e.id,
      content: e.content,
      course: ReviewCourseDto.from(e),
      rating: e.rating,
      date: e.date,
    });
  }
}
