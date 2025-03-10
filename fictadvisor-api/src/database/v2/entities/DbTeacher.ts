import {
  ScientificDegree,
  AcademicStatus,
  Position,
} from '@prisma/client/fictadvisor';
import { Decimal } from '@prisma/client/fictadvisor/runtime';
import { DbCathedra } from './DbCathedra';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';
import { DbComplaint } from './DbComplaint';

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
  rating: Decimal;
  cathedras?: DbCathedra[];
  complaints?: DbComplaint[];
  disciplineTeachers?: DbDisciplineTeacher[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
