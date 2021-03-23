import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Course } from "./course.entity";
import { Review } from "./review.entity";
import { Teacher } from "./teacher.entity";

// average of rating is cast to 'real' type because typeorm doesn't consider 'numeric' type as something JavaScript can store as a number,
// even though precision and scale can be within the range
// also @ViewColumn doesn't provide a way to implement a custom column transformer like @Column does
@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select('t.*')
        .addSelect('avg(r.rating)::real', 'rating')
        .from(Teacher, 't')
        .leftJoin(Course, 'c', 'c.teacher_id = t.id')
        .leftJoin(Review, 'r', 'r.course_id = c.id')
        .groupBy('t.id')
})
export class TeacherView {
    @ViewColumn()
    id: string;

    @ViewColumn()
    link: string;

    @ViewColumn({ name: 'first_name' })
    firstName: string;

    @ViewColumn({ name: 'middle_name' })
    middleName?: string;

    @ViewColumn({ name: 'last_name' })
    lastName?: string;

    @ViewColumn()    
    description: string;

    @ViewColumn()    
    image: string;

    @ViewColumn()    
    tags: string[];

    @ViewColumn({ name: 'created_at' })
    createdAt: Date;

    @ViewColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ViewColumn()
    rating: number;
};