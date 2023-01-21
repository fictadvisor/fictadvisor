import { slug } from '../../../utils/slug';

export class SubjectCreateDto {
  name: string;
  description?: string;

  link(): string {
    return slug(this.name);
  }
}
