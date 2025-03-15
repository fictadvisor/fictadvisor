import { DbDisciplineType } from './discipline-type.entity';
import { DbSubject } from './subject.entity';
import { DbGroup } from './group.entity';
import { DbSelectiveDiscipline } from './selective-discipline.entity';
import { DbDisciplineTeacher } from './discipline-teacher.entity';

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
