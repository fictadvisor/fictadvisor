import { AutoMap } from '@automapper/classes';

export class DbStudentResource {
  @AutoMap()
    id: string;

  @AutoMap()
    link: string;

  @AutoMap()
    name: string;

  @AutoMap()
    imageLink: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
