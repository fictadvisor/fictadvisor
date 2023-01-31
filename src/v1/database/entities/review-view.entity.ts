import { type Connection, ViewColumn, ViewEntity } from 'typeorm';
import { Course } from './course.entity';
import { Subject } from './subject.entity';
import { Review, ReviewState } from './review.entity';
import { Teacher } from './teacher.entity';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('r.id', 'id')
      .addSelect('r.content', 'content')
      .addSelect('r.rating::real', 'rating')
      .addSelect('r.state', 'state')
      .addSelect('r.createdAt', 'date')
      .addSelect('c.id', 'course_id')
      .addSelect('s.name', 'course_name')
      .addSelect('c.link', 'course_link')
      .addSelect('t.link', 'teacher_link')
      .from(Review, 'r')
      .leftJoin(Course, 'c', 'c.id = r.course_id')
      .leftJoin(Teacher, 't', 't.id = c.teacher_id')
      .leftJoin(Subject, 's', 's.id = c.subject_id'),
})
export class TeacherReviewView {
  @ViewColumn()
    id: string;

  @ViewColumn()
    content: string;

  @ViewColumn()
    state: ReviewState;

  @ViewColumn({ name: 'teacher_link' })
    teacherLink: string;

  @ViewColumn({ name: 'course_name' })
    courseName: string;

  @ViewColumn({ name: 'course_link' })
    courseLink: string;

  @ViewColumn()
    rating: number;

  @ViewColumn()
    date: Date;
}
