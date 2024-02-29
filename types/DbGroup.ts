import { Cathedra, EducationalPrograms, Role, SelectiveAmount, Speciality, Student, TelegramGroup, UserRole } from '@prisma/client';

export class DbGroup {
  id: string;
  code: string;
  admissionYear: number;
  selectiveAmounts: SelectiveAmount[];
  telegramGroups: TelegramGroup[];
  cathedra?: Cathedra;
  educationalProgram?: {
    speciality: Speciality,
  } & EducationalPrograms;
  students: ({
    roles?: ({
      role: Role,
    } & UserRole)[]
  } & Student)[];
}

