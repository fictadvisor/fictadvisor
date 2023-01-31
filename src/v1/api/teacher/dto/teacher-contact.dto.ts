import { assign } from 'src/v1/common/common.object';
import { type TeacherContact } from 'src/v1/database/entities/teacher-contact.entity';

export class TeacherContactDto {
  name: string;
  value: string;

  public static from (t: TeacherContact) {
    return assign(new TeacherContactDto(), {
      name: t.name,
      value: t.value,
    });
  }
}
