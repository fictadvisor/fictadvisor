import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Course } from "./course.entity";
import { Review, ReviewState } from "./review.entity";
import { Subject, SubjectState } from './subject.entity';

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select('s.id', 'id')
        .addSelect('count(distinct c.teacher_id)', 'teacher_count')
        .addSelect('coalesce(avg(r.rating)::real, 0)', 'rating')
        .addSelect('s.link', 'link')
        .addSelect('s.name', 'name')
        .addSelect('s.description', 'description')
        .addSelect('s.state', 'state')
        .from(Subject, 's')
        .leftJoin(Course, 'c', 'c.subject_id = s.id')
        .leftJoin(Review, 'r', `r.course_id = c.id and r.state = '${ReviewState.APPROVED}'`)
        .groupBy('s.id')
})
export class SubjectSearchIndex {
    @ViewColumn()
    id: string;

    @ViewColumn()
    link: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    description?: string

    @ViewColumn({ name: 'teacher_count' })
    teacherCount: number

    @ViewColumn()
    rating: number

    @ViewColumn()
    state: SubjectState
};
