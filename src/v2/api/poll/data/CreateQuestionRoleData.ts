import { TeacherRole } from '@prisma/client';

export class CreateQuestionRoleData {
  role: TeacherRole;
  isShown: boolean;
  isRequired: boolean;
}