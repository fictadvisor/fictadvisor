import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Subject } from "./subject.entity";
import { Course } from "./course.entity";
import { Review } from "./review.entity";

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select('s.*')
        .addSelect('count(distinct c.teacher_id)', 'teacher_count')
        .addSelect('coalesce(avg(r.rating)::real, 0)', 'rating')
        .from(Subject, 's')
        .leftJoin(Course, 'c', 'c.subject_id = s.id')
        .leftJoin(Review, 'r', 'r.course_id = c.id')
        .groupBy('s.id')
})
export class SubjectView {
    @ViewColumn()
    id: string

    @ViewColumn()
    link: string

    @ViewColumn()
    name: string

    @ViewColumn()
    description?: string

    @ViewColumn({ name: 'teacher_count' })
    teacherCount: number

    @ViewColumn()
    rating: number

    @ViewColumn({ name: 'created_at' })
    createdAt: Date

    @ViewColumn({ name: 'updated_at' })
    updatedAt: Date
}
