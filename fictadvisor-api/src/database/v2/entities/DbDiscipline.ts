import { DbDisciplineType } from './DbDisciplineType';
import { DbSubject } from './DbSubject';
import { DbGroup } from './DbGroup';
import { DbSelectiveDiscipline } from './DbSelectiveDiscipline';
import { DbDisciplineTeacher } from './DbDisciplineTeacher';

export class DbDiscipline {
  id: string;
  year: number;
  semester: number;
  isSelective: boolean;
  description: string;
  subject?: DbSubject;
  subjectId: string;
  group?: DbGroup;
  groupId: string;
  disciplineTypes?: DbDisciplineType[];
  selectiveDisciplines?: DbSelectiveDiscipline[];
  disciplineTeachers?: DbDisciplineTeacher[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
