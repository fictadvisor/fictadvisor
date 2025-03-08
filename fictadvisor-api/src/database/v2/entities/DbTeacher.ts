import {
  ScientificDegree,
  AcademicStatus,
  Position,
} from '@prisma/client/fictadvisor';
import { Decimal } from '@prisma/client/fictadvisor/runtime';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { DbComplaint } from './DbComplaint';
import { DbTeachersOnCathedras } from './DbTeachersOnCathedras';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  description: string | null;
  avatar: string | null;
  scientificDegree: ScientificDegree | null;
  academicStatus: AcademicStatus | null;
  position: Position | null;
  rating: Decimal;
  cathedras?: DbTeachersOnCathedras[];
  complaints?: DbComplaint[];
  disciplineTeachers?: DbDisciplineTeacher[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
