import { assign } from "src/common/common.object";
import { TeacherContactView } from "src/database/entities/teacher-contact-view.entity";

export class TeacherContactDto {
	name: string;

	value: string;

	type: string;

	public static from(e: TeacherContactView) {
        return assign(
            new TeacherContactDto(),
            {
                name: e.name,
                value: e.value,
                type: e.type
            }
        );
    }
}