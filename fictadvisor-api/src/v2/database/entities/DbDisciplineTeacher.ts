import {
  Group,
  Subject,
  DisciplineType,
  DisciplineTeacherRole,
  Discipline,
  Teacher,
  Cathedra,
  TeachersOnCathedras,
} from '@prisma/client';

export class DbDisciplineTeacher {
  id: string;
  teacherId: string;
  disciplineId: string;
  teacher?: Teacher & {
    cathedras?: (TeachersOnCathedras & {
      cathedra: Cathedra,
    })[],
  };
  discipline?: Discipline & {
    group?: Group,
    subject?: Subject,
    disciplineTypes?: DisciplineType[],
  };
  roles?: DisciplineTeacherRole[];
}
