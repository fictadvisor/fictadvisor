import { assign } from "src/common/common.object";
import { TeacherContact } from 'src/database/entities/teacher-contact.entity';

export class TeacherContactDto {
	name: string;
	value: string;

	public static from(t: TeacherContact) {
        return assign(
            new TeacherContactDto(),
            {
                name: t.name,
                value: t.value,
            }
        );
    }
}
