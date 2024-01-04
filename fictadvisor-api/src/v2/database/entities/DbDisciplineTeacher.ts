import { Group, Subject, DisciplineType, DisciplineTeacherRole, Discipline, Teacher } from '@prisma/client';

export class DbDisciplineTeacher {
  id: string;
  teacherId: string;
  disciplineId: string;
  teacher: Teacher;
  discipline: Discipline & {
    group: Group,
    subject: Subject,
    disciplineTypes: DisciplineType[],
  };
  roles: DisciplineTeacherRole[];
}
