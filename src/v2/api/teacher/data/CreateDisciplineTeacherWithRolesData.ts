import { CreateDisciplineTeacherDTO } from './CreateDisciplineTeacherDTO';
import { TeacherRole } from '@prisma/client';

export class CreateDisciplineTeacherWithRolesData extends CreateDisciplineTeacherDTO {
  roles: {
    role: TeacherRole,
    disciplineTypeId: string,
  }[];
}