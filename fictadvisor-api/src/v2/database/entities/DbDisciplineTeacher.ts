import {
  Teacher,
  Cathedra,
  TeachersOnCathedras,
} from '@prisma/client';
import { DbDisciplineTeacherRole } from './DbDisciplineTeacherRole';
import { DbDisciplineType } from './DbDisciplineType';
import { DbGroup } from './DbGroup';
import { DbSubject } from './DbSubject';
import { DbDiscipline } from './DbDiscipline';

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
