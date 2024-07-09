import { TeacherRole } from '@fictadvisor/utils';

export interface CreateDisciplineTeacherRoleData {
  role: TeacherRole,
  disciplineTeacherId: string,
  disciplineTypeId: string,
}
