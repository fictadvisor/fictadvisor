import { Connection, ViewColumn, ViewEntity, ManyToOne, JoinColumn } from "typeorm";
import { Course } from './course.entity';
import { Subject } from './subject.entity';
import { Review } from './review.entity';

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
    .select('r.id', 'id')
    .addSelect('r.content', 'content')
    .addSelect('r.rating', 'rating')
    .addSelect('r.createdAt', 'date')
    .addSelect('c.id', 'course_id')
    .addSelect('s.name', 'course_name')
    .addSelect('c.link', 'course_link')
    .from(Review, 'r')
    .leftJoin(Course, 'c', 'r.course_id = c.id')
    .leftJoin(Subject, 's', 'c.subject_id = s.id')
    .groupBy('c.id')
})
export class ReviewView {
    @ViewColumn()
    id: string;

    @ViewColumn()
    content: string;

    @ManyToOne(course => Course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ViewColumn({ name: 'course_link' })
    courseLink: string;

    @ViewColumn()
    rating: number;

    @ViewColumn()
    date: Date;
}