import {Connection, ViewColumn, ViewEntity} from 'typeorm';
import { Course } from './course.entity';
import { Teacher } from './teacher.entity';
import { Review, ReviewState } from './review.entity';
import { Subject } from "./subject.entity";

@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select('c.id', 'id')
        .addSelect('c.link', 'link')
        .addSelect('c.recommended', 'recommended')
        .addSelect('t.id', 'teacher_id')
        .addSelect('t.first_name', 'teacher_first_name')
        .addSelect('t.last_name', 'teacher_last_name')
        .addSelect('t.middle_name', 'teacher_middle_name')
        .addSelect('t.link', 'teacher_link')
        .addSelect('coalesce(avg(r.rating)::real, 0)', 'rating')
        .addSelect('coalesce(count(r)::real, 0)', 'review_count')
        .addSelect('s.link', 'subject_link')
        .addSelect(
            `concat(t.last_name, ' ', t.first_name, ' ', t.middle_name)`,
            'teacher_full_name'
        ).from(Course, 'c')
        .leftJoin(Teacher, 't', 'c.teacher_id = t.id')
        .leftJoin(Review, 'r', `c.id = r.course_id and r.state = '${ReviewState.APPROVED}'`)
        .leftJoin(Subject, 's', 's.id = c.subject_id')
        .groupBy('c.id, t.id, s.id')
})
export class CourseSearchIndex {
    @ViewColumn()
    id: string;

    @ViewColumn()
    link: string;

    @ViewColumn({ name: 'teacher_id' })
    teacherId: string;

    @ViewColumn({ name: 'teacher_first_name' })
    teacherFirstName: string;

    @ViewColumn({ name: 'teacher_last_name' })
    teacherLastName: string;

    @ViewColumn({ name: 'teacher_middle_name' })
    teacherMiddleName?: string;

    @ViewColumn({ name: 'teacher_full_name' })
    teacherFullName?: string

    @ViewColumn({ name: 'teacher_link' })
    teacherLink: string;

    @ViewColumn({ name: 'review_count' })
    reviewCount: number;

    @ViewColumn()
    rating: number;

    @ViewColumn()
    recommended: boolean;
    
    @ViewColumn({ name: 'subject_link' })
    subjectLink: string;
}
