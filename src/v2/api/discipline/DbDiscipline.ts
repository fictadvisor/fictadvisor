import { Subject, Group, DisciplineType, Teacher, DisciplineTeacherRole } from '@prisma/client';

export class DbDiscipline {
  id: string;
  subjectId: string;
  groupId: string;
  semester: number;
  year: number;
  isSelective: boolean;
  description: string;
  subject: Subject;
  group: Group;
  disciplineTypes: DisciplineType[];
  disciplineTeachers: {
    id: string,
    teacher: Teacher,
    roles: DisciplineTeacherRole[],
  }[];
}
