import { TeacherRole } from '@prisma/client';

export interface CreateDisciplineTeacherData {
  teacherId: string,
  disciplineTypeId: string,
  role: TeacherRole,
}