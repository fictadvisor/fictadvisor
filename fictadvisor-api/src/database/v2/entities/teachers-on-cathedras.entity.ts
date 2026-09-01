import { DbBaseCathedra } from './cathedra.entity';
import { DbBaseTeacher } from './teacher.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseTeachersOnCathedras {
  @AutoMap()
    teacherId: string;

  @AutoMap()
    cathedraId: string;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** CathedraRepository: `teachers: { teacher: true }` */
export class DbTeachersOnCathedrasWithTeacher extends DbBaseTeachersOnCathedras {
  @AutoMap(() => DbBaseTeacher)
    teacher: DbBaseTeacher;
}

/** TeacherRepository, DisciplineRepository, DisciplineTeacherRepository: `cathedras: { cathedra: true }` */
export class DbTeachersOnCathedrasWithCathedra extends DbBaseTeachersOnCathedras {
  @AutoMap(() => DbBaseCathedra)
    cathedra: DbBaseCathedra;
}
