import { TeacherRole } from '@prisma/client';

export interface CreateDisciplineTeacherRoleData {
  role: TeacherRole,
  disciplineTeacherId: string,
  disciplineTypeId: string,
}