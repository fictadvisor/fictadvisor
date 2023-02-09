import { DisciplineTeacher, DisciplineTeacherRole } from "@prisma/client";

export class DisciplineTeacherWithRoles implements DisciplineTeacher {
  disciplineId: string;
  id: string;
  teacherId: string;
  roles: DisciplineTeacherRole[];
}