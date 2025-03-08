import {
  ScientificDegree,
  AcademicStatus,
  Position,
} from '@prisma/client/fictadvisor';
import { DbDisciplineTeacher } from './discipline-teacher.entity';
import { DbComplaint } from './complaint.entity';
import { DbTeachersOnCathedras } from './teachers-on-cathedras.entity';
import { AutoMap } from '@automapper/classes';
import { Decimal } from '@prisma/client/fictadvisor/runtime/library';

export class DbTeacher {
  @AutoMap()
    id: string;

  @AutoMap()
    firstName: string;

  @AutoMap()
    middleName: string | null;

  @AutoMap()
    lastName: string;

  @AutoMap()
    description: string | null;

  @AutoMap()
    avatar: string | null;

  @AutoMap(() => String)
    scientificDegree: ScientificDegree | null;

  @AutoMap(() => String)
    academicStatus: AcademicStatus | null;

  @AutoMap(() => String)
    position: Position | null;

  @AutoMap(() => Number)
    rating: Decimal;

  @AutoMap(() => [DbTeachersOnCathedras])
    cathedras?: DbTeachersOnCathedras[];

  @AutoMap(() => [DbComplaint])
    complaints?: DbComplaint[];

  @AutoMap(() => [DbDisciplineTeacher])
    disciplineTeachers?: DbDisciplineTeacher[];

  createdAt: Date | null;
  updatedAt: Date | null;
}
