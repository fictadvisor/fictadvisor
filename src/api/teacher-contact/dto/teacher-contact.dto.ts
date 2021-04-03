import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { TeacherContact } from "src/database/entities/teacher-contact.entity";

export class TeacherContactDto {
	name: string;

	value: string;

	type: string;

	public static from(e: TeacherContact) {
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