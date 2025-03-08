import { DbCathedra } from './cathedra.entity';
import { DbTeacher } from './teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbTeachersOnCathedras {
  @AutoMap(() => DbTeacher)
    teacher?: DbTeacher;

  @AutoMap()
    teacherId: string;

  @AutoMap(() => DbCathedra)
    cathedra?: DbCathedra;

  @AutoMap()
    cathedraId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}
