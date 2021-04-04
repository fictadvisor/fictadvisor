import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Course } from "./course.entity";
import { Subject } from "./subject.entity";
import { Review } from "./review.entity";
import { Teacher } from "./teacher.entity";

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select('c.id', 'id')
        .addSelect('c.link', 'link')
        .addSelect('s.name', 'name')
        .addSelect('coalesce(count(r)::real, 0)', 'review_count')
        .addSelect('coalesce(avg(r.rating)::real, 0)', 'rating')
        .addSelect('c.recommended', 'recommended')
        .addSelect('t.link', 'teacher_link')
        .from(Course, 'c')
        .innerJoin(Subject, 's', 's.id = c.subject_id')
        .leftJoin(Review, 'r', 'c.id = r.course_id')
        .innerJoin(Teacher, 't', 't.id = c.teacher_id')
        .groupBy('c.id, s.name, t.link')
})
export class TeacherCourseSearchIndex {
    @ViewColumn()
    id: string;

    @ViewColumn()
    link: string;

    @ViewColumn()
    name: string;

    @ViewColumn({ name: 'review_count' })
    reviewCount: number;

    @ViewColumn()
    rating: number;

    @ViewColumn()
    recommended: boolean;

    @ViewColumn({ name: 'teacher_link' })
    teacherLink: string;
}
