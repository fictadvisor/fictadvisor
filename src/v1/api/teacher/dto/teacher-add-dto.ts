import { slug } from '../../../utils/slug';
import { Expose } from 'class-transformer';

export class TeacherAddDto {
  @Expose({ name: 'first_name' })
    firstName: string;

  @Expose({ name: 'middle_name' })
    middleName?: string;

  @Expose({ name: 'last_name' })
    lastName: string;

  link (): string {
    let fullName = this.lastName + ' ' + this.firstName;

    if (this.middleName) fullName += ' ' + this.middleName;

    return slug(fullName);
  }
}
