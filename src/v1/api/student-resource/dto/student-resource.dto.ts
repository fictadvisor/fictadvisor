import { assign } from 'src/v1/common/common.object';
import { StudentResource } from 'src/v1/database/entities/student-resource.entity';

export class StudentResourceDto {
  id: string;

  name: string;

  url: string;

  image: string;

  public static from(e: StudentResource) {
    return assign(new StudentResourceDto(), {
      id: e.id,
      name: e.name,
      url: e.url,
      image: e.image,
    });
  }
}
