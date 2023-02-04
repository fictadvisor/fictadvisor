import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { Course } from './course.entity';
import { Review, ReviewState } from './review.entity';
import { Teacher, TeacherState } from './teacher.entity';

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('t.id', 'id')
      .addSelect('t.link', 'link')
      .addSelect('t.first_name', 'first_name')
      .addSelect('t.middle_name', 'middle_name')
      .addSelect('t.last_name', 'last_name')
      .addSelect('t.state', 'state')
      .addSelect(
        'concat(t.last_name, \' \', t.first_name, \' \', t.middle_name)',
        'full_name'
      )
      .addSelect('coalesce(avg(r.rating)::real, 0)', 'rating')
      .from(Teacher, 't')
      .leftJoin(Course, 'c', 'c.teacher_id = t.id')
      .leftJoin(
        Review,
        'r',
        `r.course_id = c.id and r.state = '${ReviewState.APPROVED}'`
      )
      .groupBy('t.id'),
})
export class TeacherSearchIndex {
  @ViewColumn()
    id: string;

  @ViewColumn()
    link: string;

  @ViewColumn({ name: 'full_name' })
    fullName: string;

  @ViewColumn({ name: 'first_name' })
    firstName: string;

  @ViewColumn({ name: 'middle_name' })
    middleName?: string;

  @ViewColumn({ name: 'last_name' })
    lastName?: string;

  @ViewColumn()
    state: TeacherState;

  @ViewColumn()
    rating: number;
}
