import { Teacher, Group, Subject, DisciplineType, DisciplineTeacherRole } from '@prisma/client';

export class DbDisciplineTeacher {
  id: string;
  teacher: Teacher;
  teacherId: string;
  discipline: {
    group: Group,
    subject: Subject,
    disciplineTypes: DisciplineType[],
  }
  disciplineId: string;
  roles: DisciplineTeacherRole[];
}
