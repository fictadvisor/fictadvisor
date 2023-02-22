import { CreateDisciplineTeacherData } from './CreateDisciplineTeacherData';
import { TeacherRole } from '@prisma/client';

export class CreateDisciplineTeacherWithRolesData extends CreateDisciplineTeacherData {
  roles: {
    role: TeacherRole,
    disciplineTypeId: string,
  }[];
}