import { assign } from "src/common/common.object";
import { TeacherContact, TeacherContactType } from "src/database/entities/teacher-contact.entity";

export class TeacherContactDto {
	name: string;

	value: string;

	type: TeacherContactType;

	public static from(t: TeacherContact) {
        return assign(
            new TeacherContactDto(),
            {
                name: t.name,
                value: t.value,
                type: t.type
            }
        );
    }
}