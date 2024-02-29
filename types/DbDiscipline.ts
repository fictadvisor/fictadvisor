import {
  Subject,
  Group,
  DisciplineType,
  Teacher,
  DisciplineTeacherRole,
  SelectiveAmount,
  Cathedra,
  TeachersOnCathedras,
} from '@prisma/client';

export class DbDiscipline {
  id: string;
  subjectId: string;
  groupId: string;
  semester: number;
  year: number;
  isSelective: boolean;
  description: string;
  subject: Subject;
  group: Group & {
    selectiveAmounts: SelectiveAmount[]
  };
  disciplineTypes: DisciplineType[];
  disciplineTeachers: DbDiscipline_DisciplineTeacher[];
}

export class DbDiscipline_DisciplineTeacher {
  id: string;
  disciplineId: string;
  teacherId: string;
  teacher: Teacher & {
    cathedras: (TeachersOnCathedras & {
      cathedra: Cathedra,
    })[];
  };
  roles: DisciplineTeacherRole[];
}
