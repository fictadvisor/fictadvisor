import { TeacherRole } from '@fictadvisor/utils/enums';

export class DbDisciplineTeacherRole {
  disciplineTeacherId: string;
  disciplineTypeId: string;
  role: TeacherRole;
  createdAt: Date | null;
  updatedAt: Date | null;
}