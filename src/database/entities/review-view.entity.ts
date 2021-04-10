import { Connection, ViewColumn, ViewEntity, ManyToOne, JoinColumn } from "typeorm";
import { Course } from './course.entity';
import { Subject } from './subject.entity';
import { Review, ReviewState } from './review.entity';

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
    .select('r.id', 'id')
    .addSelect('r.content', 'content')
    .addSelect('r.rating', 'rating')
    .addSelect('r.state', 'state')
    .addSelect('r.createdAt', 'date')
    .addSelect('c.id', 'course_id')
    .addSelect('s.name', 'course_name')
    .addSelect('c.link', 'course_link')
    .from(Review, 'r')
    .leftJoin(Course, 'c', 'r.course_id = c.id')
    .leftJoin(Subject, 's', 'c.subject_id = s.id')
})
export class TeacherReviewView {
    @ViewColumn()
    id: string;

    @ViewColumn()
    content: string;

    @ViewColumn()
    state: ReviewState;

    @ManyToOne(course => Course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ViewColumn({ name: 'course_link' })
    courseLink: string;

    @ViewColumn({ name: 'course_name' })
    courseName: string;

    @ViewColumn()
    rating: number;

    @ViewColumn()
    date: Date;
}