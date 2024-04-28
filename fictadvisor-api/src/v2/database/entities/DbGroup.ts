import { Cathedra, EducationalPrograms, SelectiveAmount, Student, TelegramGroup, UserRole } from '@prisma/client';
import { DbRole } from './DbRole';
import { DbSpeciality } from './DbSpeciality';
import { DbStudent } from './DbStudent';

export class DbGroup {
  id: string;
  code: string;
  admissionYear: number;
  selectiveAmounts: SelectiveAmount[];
  telegramGroups: TelegramGroup[];
  cathedra?: Cathedra;
  educationalProgram?: {
    speciality: DbSpeciality,
  } & EducationalPrograms;
  students: ({
    roles?: ({
      role: DbRole,
    } & UserRole)[]
  } & DbStudent)[];
}

