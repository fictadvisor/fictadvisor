import {
  ScientificDegree,
  AcademicStatus,
  Position,
} from '@prisma/client/fictadvisor';
import { Decimal } from '@prisma/client/fictadvisor/runtime';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { DbComplaint } from './DbComplaint';
import { AutoMap } from '@automapper/classes';
import { DbTeachersOnCathedras } from './DbTeachersOnCathedras';

export class DbTeacher {
  @AutoMap()
    id: string;

  @AutoMap()
    firstName: string;

  @AutoMap()
    middleName?: string;

  @AutoMap()
    lastName: string;

  @AutoMap()
    description?: string;

  @AutoMap()
    avatar?: string;

  @AutoMap(() => String)
    scientificDegree: ScientificDegree;

  @AutoMap(() => String)
    academicStatus: AcademicStatus;

  @AutoMap(() => String)
    position: Position;

  rating: Decimal;

  @AutoMap(() => [DbTeachersOnCathedras])
    cathedras?: DbTeachersOnCathedras[];

  complaints?: DbComplaint[];
  disciplineTeachers?: DbDisciplineTeacher[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
