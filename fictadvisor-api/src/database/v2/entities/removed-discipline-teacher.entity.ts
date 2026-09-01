import { AutoMap } from '@automapper/classes';

export class DbRemovedDisciplineTeacher {
  @AutoMap()
    studentId: string;

  @AutoMap()
    disciplineTeacherId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
