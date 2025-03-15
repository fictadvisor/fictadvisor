import {
  Discipline,
  Cathedra,
  TeachersOnCathedras,
  ScientificDegree,
  AcademicStatus,
  Position,
} from '@prisma/client/fictadvisor';
import { Decimal } from '@prisma/client/fictadvisor/runtime';
import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';

export class DbTeacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  description?: string;
  avatar?: string;
  scientificDegree: ScientificDegree;
  academicStatus: AcademicStatus;
  position: Position;
  cathedras: (TeachersOnCathedras & {
    cathedra: Cathedra,
  })[];
  rating: Decimal;
  disciplineTeachers?: {
    id: string,
    teacherId: string,
    disciplineId: string,
    discipline: Discipline,
    roles: DbDisciplineTeacherRole[];
  }[];
}
