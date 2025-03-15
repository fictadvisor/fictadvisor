import {
  Group,
  Teacher,
  SelectiveAmount,
  Cathedra,
  TeachersOnCathedras,
} from '@prisma/client/fictadvisor';
import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDisciplineType } from './discipline-type.entity';
import { DbSubject } from './subject.entity';

export class DbDiscipline {
  id: string;
  subjectId: string;
  groupId: string;
  semester: number;
  year: number;
  isSelective: boolean;
  description: string;
  subject?: DbSubject;
  group?: Group & {
    selectiveAmounts: SelectiveAmount[]
  };
  disciplineTypes?: DbDisciplineType[];
  disciplineTeachers?: DbDiscipline_DisciplineTeacher[];
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
  roles: DbDisciplineTeacherRole[];
}
