import {
  Teacher,
  Cathedra,
  TeachersOnCathedras,
} from '@prisma/client/fictadvisor';
import { DbDisciplineTeacherRole } from './discipline-teacher-role.entity';
import { DbDisciplineType } from './discipline-type.entity';
import { DbGroup } from './group.entity';
import { DbSubject } from './subject.entity';
import { DbDiscipline } from './discipline.entity';

export class DbDisciplineTeacher {
  id: string;
  teacherId: string;
  disciplineId: string;
  teacher?: Teacher & {
    cathedras?: (TeachersOnCathedras & {
      cathedra: Cathedra,
    })[],
  };
  discipline?: DbDiscipline & {
    group?: DbGroup,
    subject?: DbSubject,
    disciplineTypes?: DbDisciplineType[],
  };
  roles?: DbDisciplineTeacherRole[];
}
