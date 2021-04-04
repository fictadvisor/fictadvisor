import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Teacher } from "./teacher.entity";
import { TeacherContact } from "./teacher-contact.entity";


@ViewEntity({
	expression: (connection: Connection) => connection.createQueryBuilder()
        .select('t.*')
        .addSelect('tc.teacher_id', 'teacher_id')
        .from(TeacherContact, 'tc')
        .leftJoin(Teacher, 't', 'tc.teacher_id = t.id')
        .groupBy('t.id')
})

export class TeacherContactView {
    @ViewColumn()
    name: string;

	@ViewColumn()
    value: string;

    @ViewColumn()
	type: string;

	@ViewColumn()
	link: string;
}