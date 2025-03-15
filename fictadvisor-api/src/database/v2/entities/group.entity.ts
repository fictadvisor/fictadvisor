import { Cathedra, EducationalPrograms, SelectiveAmount, TelegramGroup, UserRole } from '@prisma/client/fictadvisor';
import { DbRole } from './role.entity';
import { DbSpeciality } from './speciality.entity';
import { DbStudent } from './student.entity';

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

